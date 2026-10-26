package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.EventoCadastroDto;
import br.com.maisarte.backend.dto.EventoDto;
import br.com.maisarte.backend.entidade.Evento;
import br.com.maisarte.backend.servico.ServicoEventos;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public ResponseEntity<EventoDto> criar(@Valid @RequestBody EventoCadastroDto dto) {
        Evento evento = servicoEventos.salvar(dto.toEntity(), dto.espacosCulturais());
        return ResponseEntity.status(HttpStatus.CREATED).body(EventoDto.fromEntity(evento));
    }

    @PutMapping("/{id}")
    public EventoDto atualizar(@PathVariable Long id, @Valid @RequestBody EventoCadastroDto dto) {
        Evento eventoExistente = servicoEventos.buscarAtivoPorId(id);
        Evento eventoAtualizado = dto.toEntity();
        eventoAtualizado.setAtivo(eventoExistente.isAtivo());
        eventoAtualizado.setVerificado(eventoExistente.isVerificado());
        eventoAtualizado.setReputacaoScore(eventoExistente.getReputacaoScore());
        eventoAtualizado.setFotoPrincipal(eventoExistente.getFotoPrincipal());
        return EventoDto.fromEntity(servicoEventos.salvar(eventoAtualizado, dto.espacosCulturais()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servicoEventos.desativar(id);
        return ResponseEntity.noContent().build();
    }
}
