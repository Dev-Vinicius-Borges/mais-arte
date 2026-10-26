package br.com.maisarte.backend.servico;

import br.com.maisarte.backend.entidade.Artista;
import br.com.maisarte.backend.entidade.Banda;
import br.com.maisarte.backend.entidade.EspacoCultural;
import br.com.maisarte.backend.entidade.Evento;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ServicoBuscaCatalogo {
    private static final int MAX_RESULTADOS_POR_TIPO = 20;
    private static final Locale LOCALIDADE_PT_BR = Locale.forLanguageTag("pt-BR");

    private final ServicoArtistas artistas;
    private final ServicoBandas bandas;
    private final ServicoEspacosCulturais espacos;
    private final ServicoEventos eventos;

    public ServicoBuscaCatalogo(
            ServicoArtistas artistas,
            ServicoBandas bandas,
            ServicoEspacosCulturais espacos,
            ServicoEventos eventos) {
        this.artistas = artistas;
        this.bandas = bandas;
        this.espacos = espacos;
        this.eventos = eventos;
    }

    public List<ResultadoBuscaPlataforma> buscar(String consulta) {
        String termo = consulta.trim();
        String termoNormalizado = termo.toLowerCase(LOCALIDADE_PT_BR);
        List<ResultadoBuscaPlataforma> resultados = new ArrayList<>();

        artistas.buscarAtivosPorTermo(termo, MAX_RESULTADOS_POR_TIPO).stream()
                .map(artista -> resultadoArtista(artista, termoNormalizado)).forEach(resultados::add);
        bandas.buscarAtivosPorTermo(termo, MAX_RESULTADOS_POR_TIPO).stream()
                .map(banda -> resultadoBanda(banda, termoNormalizado)).forEach(resultados::add);
        espacos.buscarAtivosPorTermo(termo, MAX_RESULTADOS_POR_TIPO).stream()
                .map(espaco -> resultadoEspaco(espaco, termoNormalizado)).forEach(resultados::add);
        eventos.buscarAtivosPorTermo(termo, MAX_RESULTADOS_POR_TIPO).stream()
                .map(evento -> resultadoEvento(evento, termoNormalizado)).forEach(resultados::add);

        return resultados.stream()
                .sorted(Comparator.comparingInt(ResultadoBuscaPlataforma::pontuacao).reversed()
                        .thenComparing(ResultadoBuscaPlataforma::nome, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    private ResultadoBuscaPlataforma resultadoArtista(Artista artista, String consulta) {
        return montarResultado("artista", artista.getIdentificador(), artista.getNomeArtistico(),
                artista.getBioProfissional(), consulta);
    }

    private ResultadoBuscaPlataforma resultadoBanda(Banda banda, String consulta) {
        return montarResultado("banda", banda.getIdentificador(), banda.getNomeBanda(), banda.getDescricao(), consulta);
    }

    private ResultadoBuscaPlataforma resultadoEspaco(EspacoCultural espaco, String consulta) {
        return montarResultado("espaco_cultural", espaco.getIdentificador(), espaco.getNomeEspaco(), espaco.getDescricao(), consulta);
    }

    private ResultadoBuscaPlataforma resultadoEvento(Evento evento, String consulta) {
        return montarResultado("evento", evento.getIdentificador(), evento.getNomeEvento(), evento.getDescricao(), consulta);
    }

    private ResultadoBuscaPlataforma montarResultado(
            String tipo, Long id, String nome, String descricao, String consulta) {
        String nomeSeguro = nome == null ? "" : nome;
        int pontuacao = nomeSeguro.toLowerCase(LOCALIDADE_PT_BR).contains(consulta) ? 2 : 1;
        return new ResultadoBuscaPlataforma(
                tipo, id.toString(), nomeSeguro, descricao == null ? "" : descricao, pontuacao);
    }
}
