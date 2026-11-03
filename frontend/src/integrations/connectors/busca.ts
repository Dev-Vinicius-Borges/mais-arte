import { get } from "../http";
import type { ApiResponse } from "../types/apiResponse";

// O java entrega isso
type ArtistaDoBack = {
  id: number;
  nomeArtistico: string | null;
  bioProfissional: string | null;
  generosMusicais: string[];
  fotoPrincipal: string | null;
};
type EspacoDoBack = {
  id: number;
  nomeEspaco: string;
  descricao: string;
  endereco: string | null;
  fotoPrincipal: string | null;
};
type EventoDoBack = {
  id: number;
  nomeEvento: string;
  descricao: string;
  dataEvento: string;
  endereco: string;
  fotoPrincipal: string | null;
};

// Os cards recebem isso
export type TipoBusca = "artista" | "espaco_cultural" | "evento";

export type CardBusca = {
  chave: string;
  tipo: TipoBusca;
  nome: string;
  descricao: string;
  tipos: string[];
  endereco: string;
  imageUrl: string;
};

const IMAGEM_PADRAO = "https://picsum.photos/500/500";

export async function listarTudo(): Promise<ApiResponse<CardBusca[]>> {
  const [artistas, espacos, eventos] = await Promise.all([
    get<ArtistaDoBack[]>("/api/artistas"),
    get<EspacoDoBack[]>("/api/espacos-culturais"),
    get<EventoDoBack[]>("/api/eventos"),
  ]);

  if (!artistas.success) return artistas;
  if (!espacos.success) return espacos;
  if (!eventos.success) return eventos;

  const cardsArtistas = artistas.data.map((a): CardBusca => ({
    chave: `artista-${a.id}`,
    tipo: "artista",
    nome: a.nomeArtistico ?? "Artista sem nome",
    descricao: a.bioProfissional ?? "",
    tipos: a.generosMusicais,
    endereco: "",
    imageUrl: a.fotoPrincipal ?? IMAGEM_PADRAO,
  }));

  const cardsEspacos = espacos.data.map((s): CardBusca => ({
    chave: `espaco_cultural-${s.id}`,
    tipo: "espaco_cultural",
    nome: s.nomeEspaco,
    descricao: s.descricao,
    tipos: [],
    endereco: s.endereco ?? "",
    imageUrl: s.fotoPrincipal ?? IMAGEM_PADRAO,
  }));

  const cardsEventos = eventos.data.map((e): CardBusca => ({
    chave: `evento-${e.id}`,
    tipo: "evento",
    nome: e.nomeEvento,
    descricao: e.descricao,
    tipos: [],
    endereco: `${e.endereco} - ${new Date(`${e.dataEvento}T00:00:00`).toLocaleDateString("pt-BR")}`,
    imageUrl: e.fotoPrincipal ?? IMAGEM_PADRAO,
  }));

  return { success: true, data: [...cardsArtistas, ...cardsEspacos, ...cardsEventos] };
}

// normaliza o texto para remover acentos e deixar tudo em minúsculo
const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function filtrarPorTexto(cards: CardBusca[], texto: string): CardBusca[] {
  const termo = normalizar(texto.trim());
  if (termo.length < 2) return cards;

  return cards.filter((c) =>
    normalizar(`${c.nome} ${c.descricao} ${c.tipos.join(" ")}`).includes(termo)
  );
}