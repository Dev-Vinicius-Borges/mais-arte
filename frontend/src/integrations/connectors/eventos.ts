import { get } from "../http";
import type { ApiResponse } from "../types/apiResponse";


//o java entrega isso
type EventoDoBack = {
  id: number;
  nomeEvento: string;
  dataEvento: string;
  endereco: string;
  fotoPrincipal: string | null;
};

//os cards recebem isso
export type EventoParaCard = {
  id: string;
  title: string;
  date: Date;
  local: string;
  imageUrl: string;
};

export async function buscarEventosProximos(limite = 4): Promise<ApiResponse<EventoParaCard[]>> {
  const resposta = await get<EventoDoBack[]>(`/api/eventos/proximos?limite=${limite}`);

  if (!resposta.success) {
    return resposta;
  }

  const eventos = resposta.data.map((e) => ({
    id: String(e.id),
    title: e.nomeEvento,
    date: new Date(`${e.dataEvento}T00:00:00`),
    local: e.endereco,
    imageUrl: e.fotoPrincipal ?? "https://picsum.photos/200/100",
  }));

  return { success: true, data: eventos };
}