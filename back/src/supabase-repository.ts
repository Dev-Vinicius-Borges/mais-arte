import type { SupabaseClient } from "@supabase/supabase-js";
import type { EntityType, EntityWrite, Event, PlatformEntity, SearchResult } from "./domain.js";
import type { PlatformRepository } from "./repository.js";

type DatabaseRow = Record<string, unknown>;

const entityConfig: Record<EntityType, { table: string; idColumn: string }> = {
  artista: { table: "perfil_artista", idColumn: "id_perfil_artista" },
  banda: { table: "banda", idColumn: "id_banda" },
  espaco_cultural: { table: "espaco_cultural", idColumn: "id_espaco_cultural" },
  evento: { table: "evento", idColumn: "id_evento" }
};

const selectFor = (type: EntityType): string => type === "evento" ? "*, espaco_cultural(nome_espaco)" : "*";

const asString = (value: unknown) => typeof value === "string" ? value : "";
const asNullableString = (value: unknown) => typeof value === "string" ? value : null;
const asNumber = (value: unknown) => typeof value === "number" ? value : Number(value ?? 0);
const asBoolean = (value: unknown) => value === true || value === 1;

const entityName = (entity: PlatformEntity) => {
  if (entity.tipo_conteudo === "artista") return entity.nome_artistico ?? "";
  if (entity.tipo_conteudo === "banda") return entity.nome_banda;
  if (entity.tipo_conteudo === "espaco_cultural") return entity.nome_espaco;
  return entity.nome_evento;
};

const entityId = (entity: PlatformEntity) => {
  if (entity.tipo_conteudo === "artista") return entity.id_perfil_artista;
  if (entity.tipo_conteudo === "banda") return entity.id_banda;
  if (entity.tipo_conteudo === "espaco_cultural") return entity.id_espaco_cultural;
  return entity.id_evento;
};

const toArtist = (row: DatabaseRow): PlatformEntity => ({
  tipo_conteudo: "artista", id_perfil_artista: asString(row.id_perfil_artista), nome_artistico: asNullableString(row.nome_artistico),
  bio_profissional: asNullableString(row.bio_profissional), descricao: asString(row.bio_profissional), foto_principal: asNullableString(row.foto_principal),
  data_inicio_atividade: asNullableString(row.data_inicio_atividade), generos_musicais: Array.isArray(row.generos_musicais) ? row.generos_musicais.map(String) : [],
  reputacao_score: asNumber(row.reputacao_score), verificado: asBoolean(row.verificado), ativo: asBoolean(row.ativo)
});

const toBand = (row: DatabaseRow): PlatformEntity => ({
  tipo_conteudo: "banda", id_banda: asString(row.id_banda), nome_banda: asString(row.nome_banda), descricao: asString(row.descricao),
  foto_principal: asNullableString(row.foto_principal), data_formacao: asString(row.data_formacao), generos_musicais: Array.isArray(row.generos_musicais) ? row.generos_musicais.map(String) : [],
  reputacao_score: asNumber(row.reputacao_score), verificado: asBoolean(row.verificado), ativo: asBoolean(row.ativo)
});

const toSpace = (row: DatabaseRow): PlatformEntity => ({
  tipo_conteudo: "espaco_cultural", id_espaco_cultural: asString(row.id_espaco_cultural), nome_espaco: asString(row.nome_espaco), descricao: asString(row.descricao),
  foto_principal: asNullableString(row.foto_principal), site: asNullableString(row.site), horario_funcionamento: (row.horario_funcionamento as Record<string, string> | null) ?? {},
  capacidade_maxima: row.capacidade_maxima == null ? null : asNumber(row.capacidade_maxima), publico: asBoolean(row.publico), endereco: asNullableString(row.endereco),
  reputacao_score: asNumber(row.reputacao_score), verificado: asBoolean(row.verificado), ativo: asBoolean(row.ativo)
});

const toEvent = (row: DatabaseRow): Event => ({
  tipo_conteudo: "evento", id_evento: asString(row.id_evento), nome_evento: asString(row.nome_evento), descricao: asString(row.descricao),
  data_evento: asString(row.data_evento), hora_inicio: asString(row.hora_inicio), hora_fim: asNullableString(row.hora_fim), url_cartaz: asNullableString(row.url_cartaz),
  link_ingresso: asNullableString(row.link_ingresso), preco_ingresso: asNumber(row.preco_ingresso), fk_id_espaco_cultural: asString(row.fk_id_espaco_cultural),
  nome_espaco: asString(row.nome_espaco ?? (row.espaco_cultural as DatabaseRow | null)?.nome_espaco), foto_principal: asNullableString(row.foto_principal), reputacao_score: asNumber(row.reputacao_score), verificado: asBoolean(row.verificado), ativo: asBoolean(row.ativo)
});

const escapeSearch = (value: string) => value.replace(/[%,_]/g, " ");

export class SupabasePlatformRepository implements PlatformRepository {
  public constructor(private readonly client: SupabaseClient) {}

  async list(type: EntityType) {
    const { data, error } = await this.client.from(entityConfig[type].table).select(selectFor(type)).eq("ativo", true);
    if (error) throw error;
    return ((data ?? []) as unknown as DatabaseRow[]).map((row) => mapRow(type, row));
  }

  async findById(type: EntityType, id: string) {
    const config = entityConfig[type];
    const { data, error } = await this.client.from(config.table).select(selectFor(type)).eq(config.idColumn, id).eq("ativo", true).maybeSingle();
    if (error) throw error;
    return data ? mapRow(type, data as unknown as DatabaseRow) : null;
  }

  async create(input: EntityWrite) {
    const { tipo_conteudo: type, ...payload } = input;
    const { data, error } = await this.client.from(entityConfig[type].table).insert(stripId(type, payload)).select(selectFor(type)).single();
    if (error) throw error;
    return mapRow(type, data as unknown as DatabaseRow);
  }

  async update(type: EntityType, id: string, input: Partial<EntityWrite>) {
    const { tipo_conteudo: _ignoredType, ...payload } = input;
    const config = entityConfig[type];
    const { data, error } = await this.client.from(config.table).update(stripId(type, payload)).eq(config.idColumn, id).select(selectFor(type)).maybeSingle();
    if (error) throw error;
    return data ? mapRow(type, data as unknown as DatabaseRow) : null;
  }

  async remove(type: EntityType, id: string) {
    const result = await this.update(type, id, { ativo: false });
    return result !== null;
  }

  async findFeatured(type: EntityType, limit: number) {
    const { data, error } = await this.client.from(entityConfig[type].table).select(selectFor(type)).eq("ativo", true).eq("verificado", true).limit(limit);
    if (error) throw error;
    return ((data ?? []) as unknown as DatabaseRow[]).map((row) => type === "artista" ? toArtist(row) : type === "espaco_cultural" ? toSpace(row) : type === "banda" ? toBand(row) : toEvent(row));
  }

  async findUpcomingEvents(limit: number) {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await this.client.from("evento").select(selectFor("evento")).eq("ativo", true).gte("data_evento", today).order("data_evento", { ascending: true }).order("hora_inicio", { ascending: true }).limit(limit);
    if (error) throw error;
    return ((data ?? []) as unknown as DatabaseRow[]).map(toEvent);
  }

  async search(query: string, type?: EntityType) {
    const term = escapeSearch(query.trim());
    const tables: EntityType[] = type ? [type] : ["artista", "banda", "evento", "espaco_cultural"];
    const results = await Promise.all(tables.map(async (currentType) => {
      const table = entityConfig[currentType].table;
      const nameColumn = currentType === "artista" ? "nome_artistico" : currentType === "banda" ? "nome_banda" : currentType === "evento" ? "nome_evento" : "nome_espaco";
      const descriptionColumn = currentType === "artista" ? "bio_profissional" : "descricao";
      const { data, error } = await this.client.from(table).select("*").eq("ativo", true).or(`${nameColumn}.ilike.%${term}%,${descriptionColumn}.ilike.%${term}%`).limit(20);
      if (error) throw error;
      return ((data ?? []) as unknown as DatabaseRow[]).map((row) => mapRow(currentType, row));
    }));

    return results.flat().map((entity): SearchResult => ({ tipo_conteudo: entity.tipo_conteudo, id: entityId(entity), nome: entityName(entity), descricao: entity.descricao, score: entityName(entity).toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")) ? 2 : 1 }));
  }
}

const stripId = (type: EntityType, payload: Record<string, unknown>) => {
  const copy = { ...payload };
  delete copy[entityConfig[type].idColumn];
  return copy;
};

const mapRow = (type: EntityType, row: DatabaseRow) => {
  if (type === "artista") return toArtist(row);
  if (type === "banda") return toBand(row);
  if (type === "evento") return toEvent(row);
  return toSpace(row);
};