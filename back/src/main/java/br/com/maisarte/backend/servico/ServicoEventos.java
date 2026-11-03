package br.com.maisarte.backend.servico;

import br.com.maisarte.backend.entidade.EspacoCultural;
import br.com.maisarte.backend.entidade.Evento;
import br.com.maisarte.backend.repositorio.RepositorioEspacosCulturais;
import br.com.maisarte.backend.repositorio.RepositorioEventos;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

@Service
@Transactional
@Validated
public class ServicoEventos {
    private final RepositorioEventos eventos;
    private final RepositorioEspacosCulturais espacos;

    public ServicoEventos(RepositorioEventos eventos, RepositorioEspacosCulturais espacos) {
        this.eventos = eventos;
        this.espacos = espacos;
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarAtivos() {
        return eventos.buscarAtivos();
    }

    @Transactional(readOnly = true)
    public Evento buscarAtivoPorId(Long id) {
        return eventos.buscarAtivoPorId(id)
                .orElseThrow(() -> new ErroRecursoNaoEncontrado("Evento não encontrado."));
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarProximos(int limite) {
        List<Long> ids = eventos.buscarIdsProximos(LocalDate.now(), PageRequest.of(0, limite));
        return ids.isEmpty() ? List.of() : eventos.buscarProximosComEspacos(ids);
    }

    public Evento salvar(@Valid Evento evento, List<Long> idsEspacosCulturais) {
        evento.setEspacosCulturais(resolverEspacos(idsEspacosCulturais));
        return eventos.save(evento);
    }

    public void desativar(Long id) {
        Evento evento = buscarAtivoPorId(id);
        evento.setAtivo(false);
    }

    @Transactional(readOnly = true)
    public List<Evento> buscarAtivosPorTermo(String consulta, int limite) {
        return eventos.buscarAtivosPorTermo(consulta, PageRequest.of(0, limite));
    }

    private LinkedHashSet<EspacoCultural> resolverEspacos(List<Long> ids) {
        LinkedHashSet<EspacoCultural> espacosVinculados = new LinkedHashSet<>();
        if (ids == null || ids.isEmpty()) {
            return espacosVinculados;
        }
        List<EspacoCultural> encontrados = espacos.findAllById(ids);
        if (encontrados.size() != new LinkedHashSet<>(ids).size()) {
            throw new ErroRecursoNaoEncontrado("Um ou mais espaços culturais não foram encontrados.");
        }
        espacosVinculados.addAll(encontrados);
        return espacosVinculados;
    }
}
