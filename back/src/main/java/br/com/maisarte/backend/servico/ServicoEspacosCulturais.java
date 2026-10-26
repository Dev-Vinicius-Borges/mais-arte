package br.com.maisarte.backend.servico;

import br.com.maisarte.backend.entidade.EspacoCultural;
import br.com.maisarte.backend.repositorio.RepositorioEspacosCulturais;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ServicoEspacosCulturais {
    private final RepositorioEspacosCulturais repositorio;

    public ServicoEspacosCulturais(RepositorioEspacosCulturais repositorio) {
        this.repositorio = repositorio;
    }

    @Transactional(readOnly = true)
    public List<EspacoCultural> buscarAtivos() {
        return repositorio.buscarAtivos();
    }

    @Transactional(readOnly = true)
    public EspacoCultural buscarAtivoPorId(Long id) {
        return repositorio.buscarAtivoPorId(id)
                .orElseThrow(() -> new ErroRecursoNaoEncontrado("Espaço cultural não encontrado."));
    }

    @Transactional(readOnly = true)
    public List<EspacoCultural> buscarDestaques(int limite) {
        return repositorio.buscarDestaques(PageRequest.of(0, limite));
    }

    @Transactional(readOnly = true)
    public List<EspacoCultural> buscarAtivosPorTermo(String consulta, int limite) {
        return repositorio.buscarAtivosPorTermo(consulta, PageRequest.of(0, limite));
    }

    public EspacoCultural salvar(EspacoCultural espaco) {
        return repositorio.save(espaco);
    }

    public void desativar(Long id) {
        EspacoCultural espaco = buscarAtivoPorId(id);
        espaco.setAtivo(false);
    }
}
