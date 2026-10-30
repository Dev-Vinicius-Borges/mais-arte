package br.com.maisarte.backend.controller;

import br.com.maisarte.backend.dto.ArtistaCadastroDto;
import br.com.maisarte.backend.dto.ArtistaDto;
import br.com.maisarte.backend.entidade.Artista;
import br.com.maisarte.backend.servico.ServicoArtistas;
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
    } //não retorna o motter foquer 

    @GetMapping("/destaques")
    public List<ArtistaDto> destaques(@RequestParam(defaultValue = "10") int limite) {
        return servico.buscarDestaques(limite).stream().map(ArtistaDto::fromEntity).toList();
    }

    @PostMapping
    public ResponseEntity<ArtistaDto> criar(@Valid @RequestBody ArtistaCadastroDto dto) {
        Artista artista = servico.salvar(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(ArtistaDto.fromEntity(artista));
    }

    @PutMapping("/{id}")
    public ArtistaDto atualizar(@PathVariable Long id, @Valid @RequestBody ArtistaCadastroDto dto) {
        Artista existente = servico.buscarAtivoPorId(id);
        Artista atualizado = dto.toEntity();
        atualizado.setId(existente.getIdentificador());
        atualizado.setAtivo(existente.isAtivo());
        atualizado.setVerificado(existente.isVerificado());
        atualizado.setReputacaoScore(existente.getReputacaoScore());
        return ArtistaDto.fromEntity(servico.salvar(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        servico.desativar(id);
        return ResponseEntity.noContent().build();
    }
}
