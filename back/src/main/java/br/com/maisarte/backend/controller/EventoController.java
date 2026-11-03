package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.EventoDto;
import br.com.maisarte.backend.servico.ServicoEventos;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {
    private final ServicoEventos servicoEventos;

    public EventoController(ServicoEventos servicoEventos) {
        this.servicoEventos = servicoEventos;
    }

    @GetMapping
    public List<EventoDto> listar() {
        return servicoEventos.buscarAtivos().stream().map(EventoDto::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public EventoDto buscarPorId(@PathVariable Long id) {
        return EventoDto.fromEntity(servicoEventos.buscarAtivoPorId(id));
    }

    @GetMapping("/proximos")
    public List<EventoDto> buscarProximos(@RequestParam(defaultValue = "10") int limite) {
        return servicoEventos.buscarProximos(limite).stream().map(EventoDto::fromEntity).toList();
    }
}
