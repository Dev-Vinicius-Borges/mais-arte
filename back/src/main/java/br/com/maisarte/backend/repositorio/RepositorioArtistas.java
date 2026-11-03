package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.Artista;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RepositorioArtistas extends JpaRepository<Artista, Long> {
    @Query("select a from Artista a where a.ativo = true")
    List<Artista> buscarAtivos();

    @Query("select a from Artista a where a.ativo = true and a.verificado = true")
    List<Artista> buscarDestaques(Pageable pageable);

    @Query("select a from Artista a where a.id = :id and a.ativo = true")
    java.util.Optional<Artista> buscarAtivoPorId(@Param("id") Long id);

    @Query("""
            select a from Artista a
            where a.ativo = true and
              (lower(coalesce(a.nomeArtistico, '')) like concat('%', lower(:termo), '%')
               or lower(coalesce(a.bioProfissional, '')) like concat('%', lower(:termo), '%'))
            """)
    List<Artista> buscarAtivosPorTermo(@Param("termo") String termo, Pageable pageable);
}
