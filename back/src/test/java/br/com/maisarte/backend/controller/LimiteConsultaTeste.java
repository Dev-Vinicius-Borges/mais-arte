package br.com.maisarte.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

class LimiteConsultaTeste {
    @Test
    void aceitaLimiteDentroDoMaximo() {
        assertEquals(4, LimiteConsulta.validar(4, 4));
    }

    @Test
    void rejeitaLimiteForaDoIntervaloPermitido() {
        ResponseStatusException abaixoDoMinimo =
                assertThrows(ResponseStatusException.class, () -> LimiteConsulta.validar(0, 4));
        ResponseStatusException acimaDoMaximo =
                assertThrows(ResponseStatusException.class, () -> LimiteConsulta.validar(5, 4));

        assertEquals(HttpStatus.BAD_REQUEST, abaixoDoMinimo.getStatusCode());
        assertEquals(HttpStatus.BAD_REQUEST, acimaDoMaximo.getStatusCode());
    }
}
