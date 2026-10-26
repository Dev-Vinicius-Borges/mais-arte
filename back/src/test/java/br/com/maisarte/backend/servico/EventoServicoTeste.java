package br.com.maisarte.backend.servico;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import br.com.maisarte.backend.entidade.Endereco;
import br.com.maisarte.backend.entidade.Evento;
import br.com.maisarte.backend.repositorio.EventoRepositorio;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EventoServicoTeste {
    @Mock
    private EventoRepositorio eventos;

    @Mock
    private EnderecoServico enderecoServico;

    @InjectMocks
    private EventoServico servico;

    @Test
    void resolveEnderecoAntesDeSalvarEvento() {
        Evento evento = new Evento();
        Endereco informado = new Endereco();
        Endereco existente = new Endereco();
        evento.setEndereco(informado);
        when(enderecoServico.localizarOuCadastrar(informado)).thenReturn(existente);
        when(eventos.save(evento)).thenReturn(evento);

        Evento salvo = servico.salvar(evento);

        assertSame(existente, salvo.getEndereco());
        verify(eventos).save(evento);
    }

    @Test
    void exigeEnderecoAntesDeSalvarEvento() {
        assertThrows(IllegalArgumentException.class, () -> servico.salvar(new Evento()));
    }
}
