export type EntityType = "artista" | "evento" | "espaco_cultural" | "banda";

export interface BaseEntity {
  descricao: string;
  foto_principal: string | null;
  reputacao_score: number;
  verificado: boolean;
  ativo: boolean;
}

export interface Artist extends BaseEntity {
  tipo_conteudo: "artista";
  id_perfil_artista: string;
  nome_artistico: string | null;
  bio_profissional: string | null;
  data_inicio_atividade: string | null;
  generos_musicais: string[];
}

export interface Band extends BaseEntity {
  tipo_conteudo: "banda";
  id_banda: string;
  nome_banda: string;
  data_formacao: string;
  generos_musicais: string[];
}

export interface Space extends BaseEntity {
  tipo_conteudo: "espaco_cultural";
  id_espaco_cultural: string;
  nome_espaco: string;
  site: string | null;
  horario_funcionamento: Record<string, string>;
  capacidade_maxima: number | null;
  publico: boolean;
  endereco: string | null;
}

export interface Event extends BaseEntity {
  tipo_conteudo: "evento";
  id_evento: string;
  nome_evento: string;
  data_evento: string;
  hora_inicio: string;
  hora_fim: string | null;
  url_cartaz: string | null;
  link_ingresso: string | null;
  preco_ingresso: number;
  fk_id_espaco_cultural: string;
  nome_espaco: string;
}

export type PlatformEntity = Artist | Band | Space | Event;

export type EntityWrite = Partial<PlatformEntity> & { tipo_conteudo: EntityType };

export interface SearchResult {
  tipo_conteudo: EntityType;
  id: string;
  nome: string;
  descricao: string;
  score: number;
}