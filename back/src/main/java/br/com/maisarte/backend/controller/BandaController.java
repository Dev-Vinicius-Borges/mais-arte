package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.BandaCadastroDto;
import br.com.maisarte.backend.dto.BandaDto;
import br.com.maisarte.backend.entidade.Banda;
import br.com.maisarte.backend.servico.ServicoBandas;
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

    @PostMapping
    public ResponseEntity<BandaDto> criar(@Valid @RequestBody BandaCadastroDto dto) {
        Banda banda = servico.salvar(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(BandaDto.fromEntity(banda));
    }

    @PutMapping("/{id}")
    public BandaDto atualizar(@PathVariable Long id, @Valid @RequestBody BandaCadastroDto dto) {
        Banda existente = servico.buscarAtivoPorId(id);
        Banda atualizado = dto.toEntity();
        atualizado.setId(existente.getIdentificador());
        atualizado.setAtivo(existente.isAtivo());
        atualizado.setVerificado(existente.isVerificado());
        atualizado.setReputacaoScore(existente.getReputacaoScore());
        return BandaDto.fromEntity(servico.salvar(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.desativar(id);
        return ResponseEntity.noContent().build();
    }
}
