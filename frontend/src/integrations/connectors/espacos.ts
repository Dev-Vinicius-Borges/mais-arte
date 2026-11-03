import { request } from "./request";
import type { espacoculturalDto } from "../types/espacoculturalDto";
import type { espacoCulturalCadastroDto } from "../types/espacoCulturalCadastroDto";

export function listarEspacosCulturais() {
    return request<espacoculturalDto[]>("/api/espacos-culturais");
}

export function buscarEspacoCulturalPorId(id: number) {
    return request<espacoculturalDto>(`/api/espacos-culturais/${id}`);
}

export function listarEspacosCulturaisDestaque() {
    return request<espacoculturalDto[]>("/api/espacos-culturais/destaques");
}

export function cadastrarEspacoCultural(dados: espacoCulturalCadastroDto) {
    return request<espacoculturalDto>("/api/espacos-culturais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function atualizarEspacoCultural(
    id: number,
    dados: espacoCulturalCadastroDto
) {
    return request<espacoculturalDto>(`/api/espacos-culturais/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function excluirEspacoCultural(id: number) {
    return request<void>(`/api/espacos-culturais/${id}`, {
        method: "DELETE"
    });
}