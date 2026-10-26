package br.com.maisarte.backend.servico;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import br.com.maisarte.backend.entidade.Endereco;
import br.com.maisarte.backend.repositorio.EnderecoRepositorio;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class EnderecoServicoTeste {
    @Mock
    private EnderecoRepositorio enderecos;

    @InjectMocks
    private EnderecoServico servico;

    @Test
    void reutilizaEnderecoExistenteComDadosNormalizados() {
        Endereco entrada = endereco(" 80.030-000 ", "  Rua   XV de Novembro ", " 10 ", " pr ");
        Endereco existente = new Endereco();
        String chave = "80030000|rua xv de novembro|10||||pr";
        when(enderecos.findByChaveNormalizada(chave)).thenReturn(Optional.of(existente));

        Endereco resultado = servico.localizarOuCadastrar(entrada);

        assertSame(existente, resultado);
        assertEquals("80030000", entrada.getCep());
        assertEquals("Rua XV de Novembro", entrada.getLogradouro());
        assertEquals("PR", entrada.getUf());
        assertEquals(chave, entrada.getChaveNormalizada());
        verify(enderecos, never()).save(entrada);
    }

    @Test
    void cadastraEnderecoQuandoNaoEncontrado() {
        Endereco entrada = endereco(null, "Rua das Flores", "120", "PR");
        String chave = "|rua das flores|120||||pr";
        when(enderecos.findByChaveNormalizada(chave)).thenReturn(Optional.empty());
        when(enderecos.save(entrada)).thenReturn(entrada);

        Endereco resultado = servico.localizarOuCadastrar(entrada);

        assertSame(entrada, resultado);
        verify(enderecos).save(entrada);
    }

    @Test
    void rejeitaEnderecoSemLogradouroOuCepInvalido() {
        assertThrows(IllegalArgumentException.class, () -> servico.localizarOuCadastrar(endereco(null, " ", null, null)));
        assertThrows(IllegalArgumentException.class, () -> servico.localizarOuCadastrar(endereco("123", "Rua XV", null, null)));
    }

    private Endereco endereco(String cep, String logradouro, String numero, String uf) {
        Endereco endereco = new Endereco();
        endereco.setCep(cep);
        endereco.setLogradouro(logradouro);
        endereco.setNumero(numero);
        endereco.setUf(uf);
        return endereco;
    }
}
