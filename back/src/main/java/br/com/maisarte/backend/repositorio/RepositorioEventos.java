package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.Evento;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RepositorioEventos extends JpaRepository<Evento, Long> {
    @EntityGraph(attributePaths = "espacosCulturais")
    @Query("select e from Evento e where e.ativo = true")
    List<Evento> buscarAtivos();

    @EntityGraph(attributePaths = "espacosCulturais")
    @Query("select e from Evento e where e.id = :id and e.ativo = true")
    Optional<Evento> buscarAtivoPorId(@Param("id") Long id);

    @Query("""
            select e.id from Evento e
            where e.ativo = true and e.dataEvento >= :data
            order by e.dataEvento asc, e.horaInicio asc
            """)
    List<Long> buscarIdsProximos(@Param("data") LocalDate data, Pageable pageable);

    @Query("""
            select distinct e from Evento e
            left join fetch e.espacosCulturais
            where e.ativo = true and e.id in :ids
            order by e.dataEvento asc, e.horaInicio asc
            """)
    List<Evento> buscarProximosComEspacos(@Param("ids") List<Long> ids);

    @Query("""
            select e from Evento e
            where e.ativo = true and
              (lower(e.nomeEvento) like concat('%', lower(:termo), '%')
               or lower(e.descricao) like concat('%', lower(:termo), '%'))
            """)
    List<Evento> buscarAtivosPorTermo(@Param("termo") String termo, Pageable pageable);
}
