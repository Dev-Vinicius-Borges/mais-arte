package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.EspacoCulturalCadastroDto;
import br.com.maisarte.backend.dto.EspacoCulturalDto;
import br.com.maisarte.backend.entidade.EspacoCultural;
import br.com.maisarte.backend.servico.ServicoEspacosCulturais;
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
    public List<EspacoCulturalDto> destaques(@RequestParam(defaultValue = "10") int limite) {
        return servico.buscarDestaques(limite).stream().map(EspacoCulturalDto::fromEntity).toList();
    }

    @PostMapping
    public ResponseEntity<EspacoCulturalDto> criar(@Valid @RequestBody EspacoCulturalCadastroDto dto) {
        EspacoCultural salvo = servico.salvar(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(EspacoCulturalDto.fromEntity(salvo));
    }

    @PutMapping("/{id}")
    public EspacoCulturalDto atualizar(@PathVariable Long id, @Valid @RequestBody EspacoCulturalCadastroDto dto) {
        EspacoCultural existente = servico.buscarAtivoPorId(id);
        EspacoCultural atualizado = dto.toEntity();
        atualizado.setId(existente.getIdentificador());
        atualizado.setAtivo(existente.isAtivo());
        atualizado.setVerificado(existente.isVerificado());
        atualizado.setReputacaoScore(existente.getReputacaoScore());
        return EspacoCulturalDto.fromEntity(servico.salvar(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.desativar(id);
        return ResponseEntity.noContent().build();
    }
}
