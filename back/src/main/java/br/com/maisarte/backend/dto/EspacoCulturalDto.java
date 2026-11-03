package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.EspacoCultural;
import java.util.Map;

public record EspacoCulturalDto(
        Long id,
        String nomeEspaco,
        String descricao,
        String site,
        Map<String, String> horarioFuncionamento,
        Integer capacidadeMaxima,
        boolean publico,
        String endereco,
        String fotoPrincipal,
        double reputacaoScore,
        boolean verificado,
        boolean ativo
) {
    public static EspacoCulturalDto fromEntity(EspacoCultural espacoCultural) {
        if (espacoCultural == null) {
            return null;
        }

        return new EspacoCulturalDto(
                espacoCultural.getIdentificador(),
                espacoCultural.getNomeEspaco(),
                espacoCultural.getDescricao(),
                espacoCultural.getSite(),
                espacoCultural.getHorarioFuncionamento(),
                espacoCultural.getCapacidadeMaxima(),
                espacoCultural.isPublico(),
                espacoCultural.getEndereco(),
                espacoCultural.getFotoPrincipal(),
                espacoCultural.getReputacaoScore(),
                espacoCultural.isVerificado(),
                espacoCultural.isAtivo()
        );
    }
}
