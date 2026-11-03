package br.com.maisarte.backend.servico;

import br.com.maisarte.backend.entidade.Banda;
import br.com.maisarte.backend.repositorio.RepositorioBandas;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ServicoBandas {
    private final RepositorioBandas repositorio;

    public ServicoBandas(RepositorioBandas repositorio) {
        this.repositorio = repositorio;
    }

    @Transactional(readOnly = true)
    public List<Banda> buscarAtivos() {
        return repositorio.buscarAtivos();
    }

    @Transactional(readOnly = true)
    public Banda buscarAtivoPorId(Long id) {
        return repositorio.buscarAtivaPorId(id)
                .orElseThrow(() -> new ErroRecursoNaoEncontrado("Banda não encontrada."));
    }

    @Transactional(readOnly = true)
    public List<Banda> buscarAtivosPorTermo(String consulta, int limite) {
        return repositorio.buscarAtivosPorTermo(consulta, PageRequest.of(0, limite));
    }

    public Banda salvar(Banda banda) {
        return repositorio.save(banda);
    }

    public void desativar(Long id) {
        Banda banda = buscarAtivoPorId(id);
        banda.setAtivo(false);
    }
}
