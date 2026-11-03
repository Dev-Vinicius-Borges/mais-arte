package br.com.maisarte.backend.servico;

public record ResultadoBuscaPlataforma(
        String tipo, String identificador, String nome, String descricao, int pontuacao) {
}
