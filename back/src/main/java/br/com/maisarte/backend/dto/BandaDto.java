package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.Banda;
import java.time.LocalDate;
import java.util.List;

public record BandaDto(
        Long id,
        String nomeBanda,
        String descricao,
        LocalDate dataFormacao,
        List<String> generosMusicais,
        String fotoPrincipal,
        double reputacaoScore,
        boolean verificado,
        boolean ativo
) {
    public static BandaDto fromEntity(Banda banda) {
        if (banda == null) {
            return null;
        }

        return new BandaDto(
                banda.getIdentificador(),
                banda.getNomeBanda(),
                banda.getDescricao(),
                banda.getDataFormacao(),
                banda.getGenerosMusicais(),
                banda.getFotoPrincipal(),
                banda.getReputacaoScore(),
                banda.isVerificado(),
                banda.isAtivo()
        );
    }
}
