import assert from "node:assert/strict";
import { test } from "node:test";
import { buildApp } from "./app.js";

test("returns the MVP featured collections", async () => {
  const app = buildApp();
  const [events, artists, spaces] = await Promise.all([
    app.inject("/api/v1/events/upcoming"),
    app.inject("/api/v1/artists/featured"),
    app.inject("/api/v1/spaces/featured")
  ]);

  assert.equal(events.statusCode, 200);
  assert.equal(JSON.parse(events.body).data.length, 4);
  assert.equal(JSON.parse(artists.body).data.length, 4);
  assert.equal(JSON.parse(spaces.body).data.length, 3);
  await app.close();
});

test("searches across every platform entity type", async () => {
  const app = buildApp();
  const response = await app.inject("/api/v1/search?q=música");
  const body = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.ok(body.data.length >= 2);
  assert.ok(new Set(body.data.map((item: { tipo_conteudo: string }) => item.tipo_conteudo)).size >= 2);
  assert.equal(body.meta.type, "all");
  await app.close();
});

test("filters search by entity type and rejects short terms", async () => {
  const app = buildApp();
  const [filtered, invalid] = await Promise.all([
    app.inject("/api/v1/search?q=música&type=artista"),
    app.inject("/api/v1/search?q=a")
  ]);

  assert.equal(filtered.statusCode, 200);
  assert.ok(JSON.parse(filtered.body).data.every((item: { tipo_conteudo: string }) => item.tipo_conteudo === "artista"));
  assert.equal(invalid.statusCode, 400);
  assert.equal(JSON.parse(invalid.body).error, "invalid_query");
  await app.close();
});

test("creates, reads, updates and deactivates an artist", async () => {
  const app = buildApp();
  const created = await app.inject({
    method: "POST",
    url: "/api/v1/artists",
    payload: {
      nome_artistico: "Artista de Teste",
      bio_profissional: "Perfil criado pelo teste.",
      generos_musicais: ["MPB"]
    }
  });

  assert.equal(created.statusCode, 201);
  const createdId = JSON.parse(created.body).data.id_perfil_artista;

  const found = await app.inject(`/api/v1/artists/${createdId}`);
  assert.equal(found.statusCode, 200);
  assert.equal(JSON.parse(found.body).data.nome_artistico, "Artista de Teste");

  const updated = await app.inject({ method: "PATCH", url: `/api/v1/artists/${createdId}`, payload: { nome_artistico: "Artista Atualizado" } });
  assert.equal(updated.statusCode, 200);
  assert.equal(JSON.parse(updated.body).data.nome_artistico, "Artista Atualizado");

  const removed = await app.inject({ method: "DELETE", url: `/api/v1/artists/${createdId}` });
  assert.equal(removed.statusCode, 204);

  const missing = await app.inject(`/api/v1/artists/${createdId}`);
  assert.equal(missing.statusCode, 404);
  await app.close();
});