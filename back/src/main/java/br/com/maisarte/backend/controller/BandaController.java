package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.BandaDto;
import br.com.maisarte.backend.servico.ServicoBandas;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bandas")
public class BandaController {
    private final ServicoBandas servico;

    public BandaController(ServicoBandas servico) {
        this.servico = servico;
    }

    @GetMapping
    public List<BandaDto> listar() {
        return servico.buscarAtivos().stream().map(BandaDto::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public BandaDto buscarPorId(@PathVariable Long id) {
        return BandaDto.fromEntity(servico.buscarAtivoPorId(id));
    }

    @GetMapping("/pesquisa")
    public List<BandaDto> pesquisar(@RequestParam String termo, @RequestParam(defaultValue = "10") int limite) {
        return servico.buscarAtivosPorTermo(termo, limite).stream().map(BandaDto::fromEntity).toList();
    }
}
