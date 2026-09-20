import type { PlatformEntity } from "./domain.js";

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const entities: PlatformEntity[] = [
  {
    tipo_conteudo: "evento", id_evento: "1", nome_evento: "Festival de Inverno +Arte",
    descricao: "Dois dias de música, arte visual e gastronomia local.", foto_principal: image("photo-1492684223066-81342ee5ff30"),
    reputacao_score: 4.8, verificado: true, ativo: true, data_evento: "2026-10-03", hora_inicio: "15:00:00", hora_fim: "23:00:00",
    url_cartaz: null, link_ingresso: null, preco_ingresso: 35, fk_id_espaco_cultural: "1", nome_espaco: "Pátio das Artes"
  },
  {
    tipo_conteudo: "evento", id_evento: "2", nome_evento: "Noite Jazz no Paço",
    descricao: "Improviso e clássicos do jazz em uma noite intimista.", foto_principal: image("photo-1511192336575-5a79af67a629"),
    reputacao_score: 4.7, verificado: true, ativo: true, data_evento: "2026-10-09", hora_inicio: "20:00:00", hora_fim: "23:30:00",
    url_cartaz: null, link_ingresso: null, preco_ingresso: 25, fk_id_espaco_cultural: "2", nome_espaco: "Paço da Liberdade"
  },
  {
    tipo_conteudo: "evento", id_evento: "3", nome_evento: "Feira Gráfica Independente",
    descricao: "Publicações, impressos e encontros com artistas gráficos.", foto_principal: image("photo-1544816155-12df9643f363"),
    reputacao_score: 4.5, verificado: true, ativo: true, data_evento: "2026-10-17", hora_inicio: "11:00:00", hora_fim: "18:00:00",
    url_cartaz: null, link_ingresso: null, preco_ingresso: 0, fk_id_espaco_cultural: "3", nome_espaco: "Casa Hoffmann"
  },
  {
    tipo_conteudo: "evento", id_evento: "4", nome_evento: "Dança na Praça",
    descricao: "Apresentações e oficinas abertas para todos os públicos.", foto_principal: image("photo-1504609813442-a8924e83f76e"),
    reputacao_score: 4.4, verificado: true, ativo: true, data_evento: "2026-10-24", hora_inicio: "14:00:00", hora_fim: "19:00:00",
    url_cartaz: null, link_ingresso: null, preco_ingresso: 0, fk_id_espaco_cultural: "4", nome_espaco: "Estação 31"
  },
  {
    tipo_conteudo: "artista", id_perfil_artista: "1", nome_artistico: "Lia Faria",
    bio_profissional: "Cantora e compositora curitibana entre o pop e a música brasileira.", descricao: "Cantora e compositora curitibana.", foto_principal: image("photo-1534528741775-53994a69daeb"),
    reputacao_score: 4.9, verificado: true, ativo: true, data_inicio_atividade: "2018-01-01", generos_musicais: ["MPB", "Pop"]
  },
  {
    tipo_conteudo: "artista", id_perfil_artista: "2", nome_artistico: "Rafa Mello",
    bio_profissional: "Artista visual que pesquisa memória urbana e paisagem.", descricao: "Artista visual e pesquisador de memória urbana.", foto_principal: image("photo-1531058020387-3be344556be6"),
    reputacao_score: 4.6, verificado: true, ativo: true, data_inicio_atividade: "2016-01-01", generos_musicais: []
  },
  {
    tipo_conteudo: "artista", id_perfil_artista: "3", nome_artistico: "Nina Gouveia",
    bio_profissional: "Dançarina e coreógrafa dedicada a criações contemporâneas.", descricao: "Dançarina e coreógrafa contemporânea.", foto_principal: image("photo-1518611012118-696072aa579a"),
    reputacao_score: 4.7, verificado: true, ativo: true, data_inicio_atividade: "2019-01-01", generos_musicais: []
  },
  {
    tipo_conteudo: "artista", id_perfil_artista: "4", nome_artistico: "Coletivo Margem",
    bio_profissional: "Coletivo multidisciplinar de arte, educação e território.", descricao: "Coletivo de arte, educação e território.", foto_principal: image("photo-1529156069898-49953e39b3ac"),
    reputacao_score: 4.5, verificado: true, ativo: true, data_inicio_atividade: "2017-01-01", generos_musicais: []
  },
  {
    tipo_conteudo: "banda", id_banda: "1", nome_banda: "Banda Aurora Sul",
    descricao: "Quarteto independente com sonoridade dream pop.", foto_principal: image("photo-1524368535928-5b5e00ddc76b"),
    reputacao_score: 4.2, verificado: false, ativo: true, data_formacao: "2021-01-01", generos_musicais: ["Dream pop", "Indie"]
  },
  {
    tipo_conteudo: "espaco_cultural", id_espaco_cultural: "1", nome_espaco: "Pátio das Artes",
    descricao: "Espaço aberto para shows, feiras e encontros culturais.", foto_principal: image("photo-1519167758481-83f550bb49b3"),
    reputacao_score: 4.8, verificado: true, ativo: true, site: null, horario_funcionamento: {}, capacidade_maxima: 450, publico: true, endereco: "Rua das Flores, 120 - Centro"
  },
  {
    tipo_conteudo: "espaco_cultural", id_espaco_cultural: "2", nome_espaco: "Paço da Liberdade",
    descricao: "Centro cultural histórico com programação diversa.", foto_principal: image("photo-1564399579883-451a5d44ec08"),
    reputacao_score: 4.9, verificado: true, ativo: true, site: null, horario_funcionamento: {}, capacidade_maxima: 180, publico: true, endereco: "Praça Generoso Marques, 189 - Centro"
  },
  {
    tipo_conteudo: "espaco_cultural", id_espaco_cultural: "3", nome_espaco: "Casa Hoffmann",
    descricao: "Casa dedicada à dança, ao movimento e à formação.", foto_principal: image("photo-1497366754035-f200968a6e72"),
    reputacao_score: 4.7, verificado: true, ativo: true, site: null, horario_funcionamento: {}, capacidade_maxima: 120, publico: true, endereco: "Rua Claudino dos Santos, 58 - São Francisco"
  },
  {
    tipo_conteudo: "espaco_cultural", id_espaco_cultural: "4", nome_espaco: "Estação 31",
    descricao: "Galpão independente para apresentações e residências.", foto_principal: image("photo-1497366811353-6870744d04b2"),
    reputacao_score: 4.3, verificado: false, ativo: true, site: null, horario_funcionamento: {}, capacidade_maxima: 220, publico: true, endereco: "Rua 31 de Março, 80 - Rebouças"
  }
];
