import { request } from "./request";
import type { artistaDto } from "../types/artistaDto";
import type { ArtistaCadastroDto } from "../types/artistaCadastroDto";

export function listarArtistas() {
    return request<artistaDto[]>("/api/artistas");
}

export function buscarArtistaPorId(id: number) {
    return request<artistaDto>(`/api/artistas/${id}`);
}

export function listarArtistasDestaque(limite = 10) {
    return request<artistaDto[]>(`/api/artistas/destaques?limite=${limite}`);
}

export function cadastrarArtista(dados: ArtistaCadastroDto) {
    return request<artistaDto>("/api/artistas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function atualizarArtista(id: number, dados: ArtistaCadastroDto) {
    return request<artistaDto>(`/api/artistas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function excluirArtista(id: number) {
    return request<void>(`/api/artistas/${id}`, {
        method: "DELETE"
    });
}