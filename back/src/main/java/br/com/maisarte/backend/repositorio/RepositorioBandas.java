package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.Banda;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RepositorioBandas extends JpaRepository<Banda, Long> {
    @Query("select b from Banda b where b.ativo = true")
    List<Banda> buscarAtivos();

    @Query("select b from Banda b where b.id = :id and b.ativo = true")
    Optional<Banda> buscarAtivaPorId(@Param("id") Long id);

    @Query("""
            select b from Banda b
            where b.ativo = true and
              (lower(b.nomeBanda) like concat('%', lower(:termo), '%')
               or lower(b.descricao) like concat('%', lower(:termo), '%'))
            """)
    List<Banda> buscarAtivosPorTermo(@Param("termo") String termo, Pageable pageable);
}
