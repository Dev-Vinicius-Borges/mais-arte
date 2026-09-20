import cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";
import { entities } from "./data.js";
import type { EntityType, EntityWrite } from "./domain.js";
import { InMemoryPlatformRepository } from "./repository.js";
import type { PlatformRepository } from "./repository.js";
import { limitSchema, searchSchema, writeSchemas } from "./schemas.js";
import { createSupabaseRepository, hasSupabaseConfig } from "./supabase.js";

const resourcePaths: Record<EntityType, string> = { artista: "artists", banda: "bands", espaco_cultural: "spaces", evento: "events" };

const queryLimit = (query: unknown) => limitSchema.safeParse((query as { limit?: string | number }).limit ?? 4);

const registerCrudRoutes = (app: FastifyInstance, repository: PlatformRepository, type: EntityType) => {
  const path = `/api/v1/${resourcePaths[type]}`;
  const schema = writeSchemas[type];

  app.get(path, async () => ({ data: await repository.list(type) }));
  app.get(`${path}/:id`, async (request, reply) => {
    const entity = await repository.findById(type, (request.params as { id: string }).id);
    return entity ? { data: entity } : reply.code(404).send({ error: "not_found", message: "Registro não encontrado." });
  });
  app.post(path, async (request, reply) => {
    const parsed = schema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: "invalid_body", message: "Payload inválido.", details: parsed.error.flatten().fieldErrors });
    const entity = await repository.create({ ...parsed.data, tipo_conteudo: type } as EntityWrite);
    return reply.code(201).send({ data: entity });
  });
  app.patch(`${path}/:id`, async (request, reply) => {
    const parsed = schema.partial().safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: "invalid_body", message: "Payload inválido.", details: parsed.error.flatten().fieldErrors });
    const entity = await repository.update(type, (request.params as { id: string }).id, parsed.data as Partial<EntityWrite>);
    return entity ? { data: entity } : reply.code(404).send({ error: "not_found", message: "Registro não encontrado." });
  });
  app.delete(`${path}/:id`, async (request, reply) => {
    const removed = await repository.remove(type, (request.params as { id: string }).id);
    return removed ? reply.code(204).send() : reply.code(404).send({ error: "not_found", message: "Registro não encontrado." });
  });
};

export const buildApp = (repository: PlatformRepository = hasSupabaseConfig() ? createSupabaseRepository() : new InMemoryPlatformRepository(entities)) => {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: process.env.CORS_ORIGIN?.split(",") ?? true });

  app.get("/health", async () => ({
    status: "ok",
    service: "mais-arte-backend",
    timestamp: new Date().toISOString()
  }));

  app.get("/api/v1/events/upcoming", async (request, reply) => {
    const parsed = queryLimit(request.query);
    if (!parsed.success) return reply.code(400).send({ error: "invalid_limit", message: "limit deve ser um inteiro entre 1 e 50." });

    const data = await repository.findUpcomingEvents(parsed.data);
    return { data, meta: { count: data.length, limit: parsed.data } };
  });

  app.get("/api/v1/artists/featured", async (request, reply) => {
    const parsed = queryLimit(request.query);
    if (!parsed.success) return reply.code(400).send({ error: "invalid_limit", message: "limit deve ser um inteiro entre 1 e 50." });

    const data = await repository.findFeatured("artista", parsed.data);
    return { data, meta: { count: data.length, limit: parsed.data } };
  });

  app.get("/api/v1/spaces/featured", async (request, reply) => {
    const parsed = queryLimit(request.query);
    if (!parsed.success) return reply.code(400).send({ error: "invalid_limit", message: "limit deve ser um inteiro entre 1 e 50." });

    const data = await repository.findFeatured("espaco_cultural", parsed.data);
    return { data, meta: { count: data.length, limit: parsed.data } };
  });

  app.get("/api/v1/search", async (request, reply) => {
    const parsed = searchSchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.code(400).send({
        error: "invalid_query",
        message: "q deve ter entre 2 e 100 caracteres.",
        details: parsed.error.flatten().fieldErrors
      });
    }

    const data = await repository.search(parsed.data.q, parsed.data.type as EntityType | undefined);
    return { data, meta: { query: parsed.data.q, type: parsed.data.type ?? "all", count: data.length } };
  });

  (Object.keys(resourcePaths) as EntityType[]).forEach((type) => registerCrudRoutes(app, repository, type));

  return app;
};