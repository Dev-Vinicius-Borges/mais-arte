package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.Artista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistaRepositorio extends JpaRepository<Artista, Long> {
}
