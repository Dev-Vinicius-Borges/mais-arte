package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.Artista;
import java.time.LocalDate;
import java.util.List;

public record ArtistaDto(
        Long id,
        String nomeArtistico,
        String bioProfissional,
        LocalDate dataInicioAtividade,
        List<String> generosMusicais,
        String fotoPrincipal,
        double reputacaoScore,
        boolean verificado,
        boolean ativo
) {
    public static ArtistaDto fromEntity(Artista artista) {
        if (artista == null) {
            return null;
        }

        return new ArtistaDto(
                artista.getIdentificador(),
                artista.getNomeArtistico(),
                artista.getBioProfissional(),
                artista.getDataInicioAtividade(),
                artista.getGenerosMusicais(),
                artista.getFotoPrincipal(),
                artista.getReputacaoScore(),
                artista.isVerificado(),
                artista.isAtivo()
        );
    }
}
