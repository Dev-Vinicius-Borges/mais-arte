package br.com.maisarte.backend.servico;

public class ErroRecursoNaoEncontrado extends RuntimeException {
    public ErroRecursoNaoEncontrado(String mensagem) {
        super(mensagem);
    }
}
