import { get } from "../http";
import type { ApiResponse } from "../types/apiResponse";
import type { event as EventT } from "@root/types/carousel/event";
import type { ArtistT } from "@root/types/carousel/artist";
import type { PlaceT } from "@root/types/carousel/place";

export type Destaque = EventT | ArtistT | PlaceT;

// o java entrega isso
type EventoDoBack = {
  nomeEvento: string;
  dataEvento: string;
  endereco: string;
  fotoPrincipal: string | null;
};
type ArtistaDoBack = {
  nomeArtistico: string | null;
  bioProfissional: string | null;
  generosMusicais: string[];
  fotoPrincipal: string | null;
};
type EspacoDoBack = {
  nomeEspaco: string;
  descricao: string;
  endereco: string | null;
  fotoPrincipal: string | null;
};

const IMAGEM_PADRAO = "https://picsum.photos/2000/1000";

export async function buscarDestaques(): Promise<ApiResponse<Destaque[]>> {
  const [eventos, artistas, espacos] = await Promise.all([
    get<EventoDoBack[]>("/api/eventos/proximos?limite=3"),
    get<ArtistaDoBack[]>("/api/artistas/destaques?limite=3"),
    get<EspacoDoBack[]>("/api/espacos-culturais/destaques?limite=3"),
  ]);

  if (!eventos.success) return eventos;
  if (!artistas.success) return artistas;
  if (!espacos.success) return espacos;

  const itensEventos = eventos.data.map((e): EventT => {
    const data = new Date(`${e.dataEvento}T00:00:00`);
    return {
      type: "Evento",
      title: e.nomeEvento,
      startDate: data,
      endDate: data,
      local: e.endereco,
      imageUrl: e.fotoPrincipal ?? IMAGEM_PADRAO,
      pathUrl: "/busca",
      tags: [],
      visible: false,
    };
  });

  const itensArtistas = artistas.data.map((a): ArtistT => ({
    type: "Artista",
    category: { type: "Gêneros", styles: a.generosMusicais },
    imageUrl: a.fotoPrincipal ?? IMAGEM_PADRAO,
    name: a.nomeArtistico ?? "Artista sem nome",
    pathUrl: "/busca",
    resume: a.bioProfissional ?? "",
    visible: false,
  }));

  const itensEspacos = espacos.data.map((s): PlaceT => ({
    type: "Espaço Cultural",
    imageUrl: s.fotoPrincipal ?? IMAGEM_PADRAO,
    local: s.endereco ?? "",
    pathUrl: "/busca",
    resume: s.descricao,
    tags: [],
    title: s.nomeEspaco,
    visible: false,
  }));

  return { success: true, data: [...itensEventos, ...itensArtistas, ...itensEspacos] };
}