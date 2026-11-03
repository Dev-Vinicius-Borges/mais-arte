package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.EspacoCulturalDto;
import br.com.maisarte.backend.servico.ServicoEspacosCulturais;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/espacos-culturais")
public class EspacoCulturalController {
    private final ServicoEspacosCulturais servico;

    public EspacoCulturalController(ServicoEspacosCulturais servico) {
        this.servico = servico;
    }

    @GetMapping
    public List<EspacoCulturalDto> listar() {
        return servico.buscarAtivos().stream().map(EspacoCulturalDto::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public EspacoCulturalDto buscarPorId(@PathVariable Long id) {
        return EspacoCulturalDto.fromEntity(servico.buscarAtivoPorId(id));
    }

    @GetMapping("/destaques")
    public List<EspacoCulturalDto> destaques(@RequestParam(defaultValue = "3") int limite) {
        int limiteValidado = LimiteConsulta.validar(limite, 3);
        return servico.buscarDestaques(limiteValidado).stream().map(EspacoCulturalDto::fromEntity).toList();
    }
}
