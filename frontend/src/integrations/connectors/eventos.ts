import { request } from "./request";
import type { eventoDto } from "../types/eventoDto";
import type { eventoCadastroDto } from "../types/eventoCadastroDto";

export function listarEventos() {
    return request<eventoDto[]>("/api/eventos");
}

export function buscarEventoPorId(id: number) {
    return request<eventoDto>(`/api/eventos/${id}`);
}

export function listarProximosEventos() {
    return request<eventoDto[]>("/api/eventos/proximos");
}

export function cadastrarEvento(dados: eventoCadastroDto) {
    return request<eventoDto>("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function atualizarEvento(id: number, dados: eventoCadastroDto) {
    return request<eventoDto>(`/api/eventos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });
}

export function excluirEvento(id: number) {
    return request<void>(`/api/eventos/${id}`, {
        method: "DELETE"
    });
}