package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepositorio extends JpaRepository<Evento, Long> {
}
