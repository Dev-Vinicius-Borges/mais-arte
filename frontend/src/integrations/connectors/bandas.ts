import { request } from "./request";
import type { bandasDto } from "../types/bandasDto";
import type { bandaCadastroDto } from "../types/bandaCadastroDto";

export function listarBandas() {
    return request<bandasDto[]>("/api/bandas");
}

export function buscarBandaPorId(id: number) {
    return request<bandasDto>(`/api/bandas/${id}`);
}

export function pesquisarBandas(termo: string, limite = 10) {
    const params = new URLSearchParams({
        termo,
        limite: String(limite)
    });

    return request<bandasDto[]>(`/api/bandas/pesquisa?${params}`);
}

export function cadastrarBanda(dados: bandaCadastroDto) {
    return request<bandasDto>("/api/bandas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function atualizarBanda(id: number, dados: bandaCadastroDto) {
    return request<bandasDto>(`/api/bandas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function excluirBanda(id: number) {
    return request<void>(`/api/bandas/${id}`, {
        method: "DELETE"
    });
}