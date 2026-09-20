import cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";
import { z } from "zod";
import { entities } from "./data.js";
import type { EntityType, EntityWrite } from "./domain.js";
import { InMemoryPlatformRepository } from "./repository.js";
import type { PlatformRepository } from "./repository.js";
import { createSupabaseRepository, hasSupabaseConfig } from "./supabase.js";

const limitSchema = z.coerce.number().int().min(1).max(50).default(4);
const searchSchema = z.object({
  q: z.string().trim().min(2).max(100),
  type: z.enum(["artista", "banda", "evento", "espaco_cultural"]).optional()
});

const writeSchemas = {
  artista: z.object({ nome_artistico: z.string().min(2).max(150), bio_profissional: z.string().max(5000).nullable().optional(), foto_principal: z.string().url().nullable().optional(), data_inicio_atividade: z.string().date().nullable().optional(), generos_musicais: z.array(z.string().min(1)).default([]) }),
  banda: z.object({ nome_banda: z.string().min(2).max(150), descricao: z.string().min(1).max(5000), data_formacao: z.string().date(), foto_principal: z.string().url().nullable().optional(), generos_musicais: z.array(z.string().min(1)).default([]) }),
  espaco_cultural: z.object({ nome_espaco: z.string().min(2).max(150), descricao: z.string().min(1).max(5000), site: z.string().url().nullable().optional(), horario_funcionamento: z.record(z.string(), z.string()).default({}), capacidade_maxima: z.number().int().positive().nullable().optional(), publico: z.boolean().default(true), endereco: z.string().max(255).nullable().optional(), foto_principal: z.string().url().nullable().optional() }),
  evento: z.object({ nome_evento: z.string().min(2).max(150), descricao: z.string().min(1).max(5000), data_evento: z.string().date(), hora_inicio: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/), hora_fim: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).nullable().optional(), url_cartaz: z.string().url().nullable().optional(), link_ingresso: z.string().url().nullable().optional(), preco_ingresso: z.number().nonnegative().default(0), fk_id_espaco_cultural: z.coerce.string().min(1), foto_principal: z.string().url().nullable().optional() })
};

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