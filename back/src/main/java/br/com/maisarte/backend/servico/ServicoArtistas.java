package br.com.maisarte.backend.servico;

import br.com.maisarte.backend.entidade.Artista;
import br.com.maisarte.backend.repositorio.RepositorioArtistas;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ServicoArtistas {
    private final RepositorioArtistas repositorio;

    public ServicoArtistas(RepositorioArtistas repositorio) {
        this.repositorio = repositorio;
    }

    @Transactional(readOnly = true)
    public List<Artista> buscarAtivos() {
        return repositorio.buscarAtivos();
    }

    @Transactional(readOnly = true)
    public Artista buscarAtivoPorId(Long id) {
        return repositorio.buscarAtivoPorId(id)
                .orElseThrow(() -> new ErroRecursoNaoEncontrado("Artista não encontrado."));
    }

    @Transactional(readOnly = true)
    public List<Artista> buscarDestaques(int limite) {
        return repositorio.buscarDestaques(PageRequest.of(0, limite));
    }

    @Transactional(readOnly = true)
    public List<Artista> buscarAtivosPorTermo(String consulta, int limite) {
        return repositorio.buscarAtivosPorTermo(consulta, PageRequest.of(0, limite));
    }

    public Artista salvar(Artista artista) {
        return repositorio.save(artista);
    }

    public void desativar(Long id) {
        Artista artista = buscarAtivoPorId(id);
        artista.setAtivo(false);
    }
}
