package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.EspacoCultural;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EspacoCulturalRepositorio extends JpaRepository<EspacoCultural, Long> {
}
