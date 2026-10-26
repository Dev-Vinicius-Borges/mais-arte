package br.com.maisarte.backend.servico;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import br.com.maisarte.backend.entidade.EspacoCultural;
import br.com.maisarte.backend.entidade.Evento;
import br.com.maisarte.backend.repositorio.RepositorioEspacosCulturais;
import br.com.maisarte.backend.repositorio.RepositorioEventos;
import jakarta.validation.Validation;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ServicoEventosTeste {
    @Mock
    private RepositorioEventos eventos;

    @Mock
    private RepositorioEspacosCulturais espacos;

    @InjectMocks
    private ServicoEventos servico;

    @Test
    void salvaEventoSemEspacosCulturais() {
        Evento evento = new Evento();
        evento.setEndereco("Rua XV de Novembro, Curitiba");
        when(eventos.save(any(Evento.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Evento salvo = servico.salvar(evento, List.of());

        assertEquals("Rua XV de Novembro, Curitiba", salvo.getEndereco());
        assertEquals(0, salvo.getEspacosCulturais().size());
        verify(eventos).save(evento);
    }

    @Test
    void salvaEventoVinculadoAVariosEspacosCulturais() {
        Evento evento = new Evento();
        evento.setEndereco("Praça pública, Curitiba");
        EspacoCultural primeiro = new EspacoCultural();
        EspacoCultural segundo = new EspacoCultural();
        when(espacos.findAllById(List.of(10L, 20L))).thenReturn(List.of(primeiro, segundo));
        when(eventos.save(any(Evento.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Evento salvo = servico.salvar(evento, List.of(10L, 20L));

        assertEquals(2, salvo.getEspacosCulturais().size());
        verify(eventos).save(evento);
    }

    @Test
    void exigeEnderecoDoEvento() {
        try (var validatorFactory = Validation.buildDefaultValidatorFactory()) {
            Evento evento = new Evento();

            assertTrue(validatorFactory.getValidator().validate(evento).stream()
                    .anyMatch(violation -> violation.getPropertyPath().toString().equals("endereco")));
        }
    }
}
