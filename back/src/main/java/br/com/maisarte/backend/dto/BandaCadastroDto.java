package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.Banda;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public record BandaCadastroDto(
        @NotBlank(message = "O nome da banda é obrigatório.")
        @Size(max = 150, message = "O nome da banda deve ter até 150 caracteres.")
        String nomeBanda,

        @NotBlank(message = "A descrição é obrigatória.")
        String descricao,

        @NotNull(message = "A data de formação é obrigatória.")
        LocalDate dataFormacao,

        List<String> generosMusicais,
        String fotoPrincipal
) {
    public Banda toEntity() {
        Banda banda = new Banda();
        banda.setNomeBanda(nomeBanda);
        banda.setDescricao(descricao);
        banda.setDataFormacao(dataFormacao);
        banda.setGenerosMusicais(generosMusicais == null ? List.of() : generosMusicais);
        banda.setFotoPrincipal(fotoPrincipal);
        return banda;
    }
}
