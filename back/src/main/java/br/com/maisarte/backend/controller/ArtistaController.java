package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.ArtistaDto;
import br.com.maisarte.backend.servico.ServicoArtistas;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/artistas")
public class ArtistaController {
    private final ServicoArtistas servico;

    public ArtistaController(ServicoArtistas servico) {
        this.servico = servico;
    }

    @GetMapping
    public List<ArtistaDto> listar() {
        return servico.buscarAtivos().stream().map(ArtistaDto::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public ArtistaDto buscarPorId(@PathVariable Long id) {
        return ArtistaDto.fromEntity(servico.buscarAtivoPorId(id));
    }

    @GetMapping("/destaques")
    public List<ArtistaDto> destaques(@RequestParam(defaultValue = "10") int limite) {
        return servico.buscarDestaques(limite).stream().map(ArtistaDto::fromEntity).toList();
    }
}
