import type { EntityType, EntityWrite, Event, PlatformEntity, SearchResult } from "./domain.js";

export interface PlatformRepository {
  list(type: EntityType): Promise<PlatformEntity[]>;
  findById(type: EntityType, id: string): Promise<PlatformEntity | null>;
  create(input: EntityWrite): Promise<PlatformEntity>;
  update(type: EntityType, id: string, input: Partial<EntityWrite>): Promise<PlatformEntity | null>;
  remove(type: EntityType, id: string): Promise<boolean>;
  findFeatured(type: EntityType, limit: number): Promise<PlatformEntity[]>;
  findUpcomingEvents(limit: number): Promise<PlatformEntity[]>;
  search(query: string, type?: EntityType): Promise<SearchResult[]>;
}

const searchableText = (entity: PlatformEntity) => {
  const fields = [entity.descricao, entity.tipo_conteudo];

  if (entity.tipo_conteudo === "artista") fields.push(entity.nome_artistico ?? "", entity.bio_profissional ?? "", ...entity.generos_musicais);
  if (entity.tipo_conteudo === "banda") fields.push(entity.nome_banda, ...entity.generos_musicais);
  if (entity.tipo_conteudo === "espaco_cultural") fields.push(entity.nome_espaco, entity.endereco ?? "");
  if (entity.tipo_conteudo === "evento") fields.push(entity.nome_evento, entity.nome_espaco);

  return fields.join(" ").toLocaleLowerCase("pt-BR");
};

const entityName = (entity: PlatformEntity) => {
  if (entity.tipo_conteudo === "artista") return entity.nome_artistico ?? "";
  if (entity.tipo_conteudo === "banda") return entity.nome_banda;
  if (entity.tipo_conteudo === "espaco_cultural") return entity.nome_espaco;
  return entity.nome_evento;
};

export class InMemoryPlatformRepository implements PlatformRepository {
  public constructor(private readonly items: PlatformEntity[]) {}

  async list(type: EntityType) {
    return this.items.filter((item) => item.tipo_conteudo === type && item.ativo);
  }

  async findById(type: EntityType, id: string) {
    return this.items.find((item) => item.tipo_conteudo === type && item.ativo && this.entityId(item) === id) ?? null;
  }

  async create(input: EntityWrite) {
    const entity = { ...input, ...this.generatedFields(input) } as PlatformEntity;
    this.items.push(entity);
    return entity;
  }

  async update(type: EntityType, id: string, input: Partial<EntityWrite>) {
    const index = this.items.findIndex((item) => item.tipo_conteudo === type && this.entityId(item) === id);
    if (index < 0) return null;
    const updated = { ...this.items[index], ...input, tipo_conteudo: type } as PlatformEntity;
    this.items[index] = updated;
    return updated;
  }

  async remove(type: EntityType, id: string) {
    const entity = await this.update(type, id, { ativo: false });
    return entity !== null;
  }

  async findFeatured(type: EntityType, limit: number) {
    return this.items.filter((item) => item.tipo_conteudo === type && item.verificado && item.ativo).slice(0, limit);
  }

  async findUpcomingEvents(limit: number) {
    return this.items
      .filter((item): item is Event => item.tipo_conteudo === "evento" && item.ativo && new Date(`${item.data_evento}T${item.hora_inicio}`).getTime() >= Date.now())
      .sort((first, second) => new Date(`${first.data_evento}T${first.hora_inicio}`).getTime() - new Date(`${second.data_evento}T${second.hora_inicio}`).getTime())
      .slice(0, limit);
  }

  async search(query: string, type?: EntityType) {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return this.items
      .filter((item) => !type || item.tipo_conteudo === type)
      .map((item) => ({ item, score: searchableText(item).includes(normalizedQuery) ? (entityName(item).toLocaleLowerCase("pt-BR").includes(normalizedQuery) ? 2 : 1) : 0 }))
      .filter(({ score }) => score > 0)
      .sort((first, second) => second.score - first.score || entityName(first.item).localeCompare(entityName(second.item), "pt-BR"))
      .map(({ item, score }) => ({ tipo_conteudo: item.tipo_conteudo, id: this.entityId(item), nome: entityName(item), descricao: item.descricao, score }));
  }

  private entityId(entity: PlatformEntity) {
    if (entity.tipo_conteudo === "artista") return entity.id_perfil_artista;
    if (entity.tipo_conteudo === "banda") return entity.id_banda;
    if (entity.tipo_conteudo === "espaco_cultural") return entity.id_espaco_cultural;
    return entity.id_evento;
  }

  private generatedFields(input: EntityWrite) {
    const nextId = String(this.items.length + 1);
    const common = { descricao: input.descricao ?? "", foto_principal: input.foto_principal ?? null, reputacao_score: 0, verificado: false, ativo: true };
    if (input.tipo_conteudo === "artista") return { ...common, id_perfil_artista: nextId, nome_artistico: input.nome_artistico ?? null, bio_profissional: input.bio_profissional ?? null, data_inicio_atividade: input.data_inicio_atividade ?? null, generos_musicais: input.generos_musicais ?? [] };
    if (input.tipo_conteudo === "banda") return { ...common, id_banda: nextId, nome_banda: input.nome_banda ?? "", data_formacao: input.data_formacao ?? "", generos_musicais: input.generos_musicais ?? [] };
    if (input.tipo_conteudo === "espaco_cultural") return { ...common, id_espaco_cultural: nextId, nome_espaco: input.nome_espaco ?? "", site: input.site ?? null, horario_funcionamento: input.horario_funcionamento ?? {}, capacidade_maxima: input.capacidade_maxima ?? null, publico: input.publico ?? true, endereco: input.endereco ?? null };
    return { ...common, id_evento: nextId, nome_evento: input.nome_evento ?? "", data_evento: input.data_evento ?? "", hora_inicio: input.hora_inicio ?? "", hora_fim: input.hora_fim ?? null, url_cartaz: input.url_cartaz ?? null, link_ingresso: input.link_ingresso ?? null, preco_ingresso: input.preco_ingresso ?? 0, fk_id_espaco_cultural: input.fk_id_espaco_cultural ?? "", nome_espaco: input.nome_espaco ?? "" };
  }
}