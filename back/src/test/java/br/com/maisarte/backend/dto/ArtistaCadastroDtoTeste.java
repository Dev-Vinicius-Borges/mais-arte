package br.com.maisarte.backend.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;

class ArtistaCadastroDtoTeste {
    @Test
    void converteDataInicioAtividadeParaEntidade() {
        LocalDate dataInicio = LocalDate.of(2020, 1, 15);
        ArtistaCadastroDto dto = new ArtistaCadastroDto("Artista", null, dataInicio, List.of(), null);

        assertEquals(dataInicio, dto.toEntity().getDataInicioAtividade());
    }
}
