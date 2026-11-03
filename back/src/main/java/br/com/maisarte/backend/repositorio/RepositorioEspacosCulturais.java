package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.EspacoCultural;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RepositorioEspacosCulturais extends JpaRepository<EspacoCultural, Long> {
    @Query("select s from EspacoCultural s where s.ativo = true")
    List<EspacoCultural> buscarAtivos();

    @Query("select s from EspacoCultural s where s.ativo = true and s.verificado = true")
    List<EspacoCultural> buscarDestaques(Pageable pageable);

    @Query("select s from EspacoCultural s where s.id = :id and s.ativo = true")
    Optional<EspacoCultural> buscarAtivoPorId(@Param("id") Long id);

    @Query("""
            select s from EspacoCultural s
            where s.ativo = true and
              (lower(s.nomeEspaco) like concat('%', lower(:termo), '%')
               or lower(s.descricao) like concat('%', lower(:termo), '%'))
            """)
    List<EspacoCultural> buscarAtivosPorTermo(@Param("termo") String termo, Pageable pageable);
}
