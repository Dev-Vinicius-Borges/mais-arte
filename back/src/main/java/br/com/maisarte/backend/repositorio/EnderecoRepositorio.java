package br.com.maisarte.backend.repositorio;

import br.com.maisarte.backend.entidade.Endereco;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepositorio extends JpaRepository<Endereco, Long> {
    Optional<Endereco> findByChaveNormalizada(String chaveNormalizada);
}
