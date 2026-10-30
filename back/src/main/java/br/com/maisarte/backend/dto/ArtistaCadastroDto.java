package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.Artista;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public record ArtistaCadastroDto(
        @NotBlank(message = "O nome artístico é obrigatório.")
        @Size(max = 150, message = "O nome artístico deve ter até 150 caracteres.")
        String nomeArtistico,

        @Size(max = 4000, message = "A biografia deve ter até 4000 caracteres.")
        String bioProfissional,

        LocalDate dataInicioAtividade,
        List<String> generosMusicais,
        String fotoPrincipal
) {
    public Artista toEntity() {
        Artista artista = new Artista();
        artista.setNomeArtistico(nomeArtistico);
        artista.setBioProfissional(bioProfissional);
      winget install Apache.Maven  artista.setDataInicioAtividade(dataInicioAtividade);
      
        artista.setGenerosMusicais(generosMusicais == null ? List.of() : generosMusicais);
        artista.setFotoPrincipal(fotoPrincipal);
        return artista;
    }
}
