package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.Evento;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record EventoCadastroDto(
        @NotBlank(message = "O nome do evento é obrigatório.")
        @Size(max = 150, message = "O nome do evento deve ter até 150 caracteres.")
        String nomeEvento,

        @NotBlank(message = "A descrição do evento é obrigatória.")
        String descricao,

        @NotNull(message = "A data do evento é obrigatória.")
        LocalDate dataEvento,

        @NotNull(message = "A hora de início é obrigatória.")
        LocalTime horaInicio,

        LocalTime horaFim,
        String urlCartaz,
        String linkIngresso,

        @NotNull(message = "O preço do ingresso é obrigatório.")
        @DecimalMin(value = "0.00", inclusive = true, message = "O preço do ingresso não pode ser negativo.")
        BigDecimal precoIngresso,

        @NotBlank(message = "O endereço do evento é obrigatório.")
        String endereco,

        List<Long> espacosCulturais,
        String fotoPrincipal
) {
    public Evento toEntity() {
        Evento evento = new Evento();
        evento.setNomeEvento(nomeEvento);
        evento.setDescricao(descricao);
        evento.setDataEvento(dataEvento);
        evento.setHoraInicio(horaInicio);
        evento.setHoraFim(horaFim);
        evento.setUrlCartaz(urlCartaz);
        evento.setLinkIngresso(linkIngresso);
        evento.setPrecoIngresso(precoIngresso == null ? BigDecimal.ZERO : precoIngresso);
        evento.setEndereco(endereco);
        evento.setFotoPrincipal(fotoPrincipal);
        return evento;
    }
}
