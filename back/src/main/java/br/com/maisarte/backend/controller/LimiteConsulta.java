package br.com.maisarte.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

final class LimiteConsulta {
    private LimiteConsulta() {}

    static int validar(int limite, int maximo) {
        if (limite < 1 || limite > maximo) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "O limite deve estar entre 1 e " + maximo + ".");
        }
        return limite;
    }
}
