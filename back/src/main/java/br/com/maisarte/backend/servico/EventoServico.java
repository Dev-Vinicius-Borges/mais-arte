package br.com.maisarte.backend.servico;

import br.com.maisarte.backend.entidade.Endereco;
import br.com.maisarte.backend.entidade.Evento;
import br.com.maisarte.backend.repositorio.EventoRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventoServico {
    private final EventoRepositorio eventos;
    private final EnderecoServico enderecoServico;

    public EventoServico(EventoRepositorio eventos, EnderecoServico enderecoServico) {
        this.eventos = eventos;
        this.enderecoServico = enderecoServico;
    }

    @Transactional
    public Evento salvar(Evento evento) {
        if (evento == null || evento.getEndereco() == null) {
            throw new IllegalArgumentException("O evento deve possuir um endereço.");
        }

        Endereco endereco = enderecoServico.localizarOuCadastrar(evento.getEndereco());
        evento.setEndereco(endereco);
        return eventos.save(evento);
    }
}
