import { api_url } from "./configs/api";
import type { ApiResponse } from "./types/apiResponse";

export async function get<T>(caminho: string): Promise<ApiResponse<T>> {
  try {
    const resposta = await fetch(`${api_url}${caminho}`);

    if (!resposta.ok) {
      return { success: false, error: { status: resposta.status, message: "Erro ao chamar a API" } };
    }

    const dados = await resposta.json();
    return { success: true, data: dados as T };
  } catch {
    return { success: false, error: { status: null, message: "Não foi possível conectar à API" } };
  }
}