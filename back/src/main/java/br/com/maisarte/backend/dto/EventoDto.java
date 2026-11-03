package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.Evento;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventoDto(
        Long id,
        String nomeEvento,
        String descricao,
        LocalDate dataEvento,
        LocalTime horaInicio,
        LocalTime horaFim,
        String urlCartaz,
        String linkIngresso,
        BigDecimal precoIngresso,
        String endereco,
        List<Long> espacosCulturais,
        String fotoPrincipal,
        double reputacaoScore,
        boolean verificado,
        boolean ativo
) {
    public static EventoDto fromEntity(Evento evento) {
        if (evento == null) {
            return null;
        }

        return new EventoDto(
                evento.getIdentificador(),
                evento.getNomeEvento(),
                evento.getDescricao(),
                evento.getDataEvento(),
                evento.getHoraInicio(),
                evento.getHoraFim(),
                evento.getUrlCartaz(),
                evento.getLinkIngresso(),
                evento.getPrecoIngresso(),
                evento.getEndereco(),
                evento.getEspacosCulturais() == null
                        ? List.of()
                        : evento.getEspacosCulturais().stream().map(e -> e.getIdentificador()).toList(),
                evento.getFotoPrincipal(),
                evento.getReputacaoScore(),
                evento.isVerificado(),
                evento.isAtivo()
        );
    }
}
