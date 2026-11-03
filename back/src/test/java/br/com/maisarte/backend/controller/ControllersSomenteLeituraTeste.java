package br.com.maisarte.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import br.com.maisarte.backend.servico.ServicoArtistas;
import br.com.maisarte.backend.servico.ServicoBandas;
import br.com.maisarte.backend.servico.ServicoEspacosCulturais;
import br.com.maisarte.backend.servico.ServicoEventos;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.test.web.servlet.MockMvc;

class ControllersSomenteLeituraTeste {
    private MockMvc mockMvc;

    @BeforeEach
    void configurarControllers() {
        mockMvc = standaloneSetup(
                new ArtistaController(mock(ServicoArtistas.class)),
                new BandaController(mock(ServicoBandas.class)),
                new EspacoCulturalController(mock(ServicoEspacosCulturais.class)),
                new EventoController(mock(ServicoEventos.class)))
                .build();
    }

    @Test
    void rejeitaTodasAsRotasDeEscrita() throws Exception {
        List<String> colecoes = List.of(
                "/api/artistas",
                "/api/bandas",
                "/api/espacos-culturais",
                "/api/eventos");

        for (String colecao : colecoes) {
            mockMvc.perform(request(HttpMethod.POST, colecao))
                    .andExpect(status().isMethodNotAllowed());
            mockMvc.perform(request(HttpMethod.PUT, colecao + "/1"))
                    .andExpect(status().isMethodNotAllowed());
            mockMvc.perform(request(HttpMethod.DELETE, colecao + "/1"))
                    .andExpect(status().isMethodNotAllowed());
        }
    }
}
