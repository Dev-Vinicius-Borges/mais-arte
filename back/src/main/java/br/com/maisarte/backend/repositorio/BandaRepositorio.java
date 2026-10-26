package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.Banda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BandaRepositorio extends JpaRepository<Banda, Long> {
}
