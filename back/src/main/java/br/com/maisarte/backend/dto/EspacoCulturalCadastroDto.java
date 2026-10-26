package br.com.maisarte.backend.dto;

import br.com.maisarte.backend.entidade.EspacoCultural;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Map;

public record EspacoCulturalCadastroDto(
        @NotBlank(message = "O nome do espaço cultural é obrigatório.")
        @Size(max = 150, message = "O nome do espaço cultural deve ter até 150 caracteres.")
        String nomeEspaco,

        @NotBlank(message = "A descrição é obrigatória.")
        String descricao,

        @Size(max = 255, message = "O site deve ter até 255 caracteres.")
        String site,

        Map<String, String> horarioFuncionamento,
        Integer capacidadeMaxima,
        Boolean publico,

        @NotBlank(message = "O endereço do espaço cultural é obrigatório.")
        String endereco,

        String fotoPrincipal
) {
    public EspacoCultural toEntity() {
        EspacoCultural espaco = new EspacoCultural();
        espaco.setNomeEspaco(nomeEspaco);
        espaco.setDescricao(descricao);
        espaco.setSite(site);
        espaco.setHorarioFuncionamento(horarioFuncionamento == null ? Map.of() : horarioFuncionamento);
        espaco.setCapacidadeMaxima(capacidadeMaxima);
        espaco.setPublico(Boolean.TRUE.equals(publico));
        espaco.setEndereco(endereco);
        espaco.setFotoPrincipal(fotoPrincipal);
        return espaco;
    }
}
