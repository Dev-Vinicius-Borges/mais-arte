package br.com.maisarte.backend.servico;

import br.com.maisarte.backend.entidade.Endereco;
import br.com.maisarte.backend.repositorio.EnderecoRepositorio;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnderecoServico {
    private static final Locale LOCALIDADE_BRASILEIRA = Locale.forLanguageTag("pt-BR");

    private final EnderecoRepositorio enderecos;

    public EnderecoServico(EnderecoRepositorio enderecos) {
        this.enderecos = enderecos;
    }

    @Transactional
    public Endereco localizarOuCadastrar(Endereco endereco) {
        if (endereco == null) {
            throw new IllegalArgumentException("O endereço do evento é obrigatório.");
        }

        normalizar(endereco);
        endereco.setChaveNormalizada(criarChave(endereco));

        return enderecos.findByChaveNormalizada(endereco.getChaveNormalizada())
                .orElseGet(() -> enderecos.save(endereco));
    }

    private void normalizar(Endereco endereco) {
        endereco.setLogradouro(normalizarTextoObrigatorio(endereco.getLogradouro()));
        endereco.setCep(normalizarCep(endereco.getCep()));
        endereco.setNumero(normalizarTextoOpcional(endereco.getNumero()));
        endereco.setComplemento(normalizarTextoOpcional(endereco.getComplemento()));
        endereco.setBairro(normalizarTextoOpcional(endereco.getBairro()));
        endereco.setCidade(normalizarTextoOpcional(endereco.getCidade()));
        endereco.setUf(normalizarUf(endereco.getUf()));
        endereco.setPontoReferencia(normalizarTextoOpcional(endereco.getPontoReferencia()));
    }

    private String normalizarCep(String cep) {
        if (cep == null || cep.isBlank()) {
            return null;
        }

        String cepNormalizado = cep.replaceAll("\\D", "");
        if (!cepNormalizado.matches("\\d{8}")) {
            throw new IllegalArgumentException("O CEP deve conter exatamente 8 dígitos.");
        }
        return cepNormalizado;
    }

    private String normalizarUf(String uf) {
        String ufNormalizada = normalizarTextoOpcional(uf);
        if (ufNormalizada == null) {
            return null;
        }

        ufNormalizada = ufNormalizada.toUpperCase(LOCALIDADE_BRASILEIRA);
        if (!ufNormalizada.matches("[A-Z]{2}")) {
            throw new IllegalArgumentException("A UF deve conter exatamente 2 letras.");
        }
        return ufNormalizada;
    }

    private String normalizarTextoObrigatorio(String valor) {
        String valorNormalizado = normalizarTextoOpcional(valor);
        if (valorNormalizado == null) {
            throw new IllegalArgumentException("O logradouro do endereço é obrigatório.");
        }
        return valorNormalizado;
    }

    private String normalizarTextoOpcional(String valor) {
        if (valor == null || valor.isBlank()) {
            return null;
        }
        return valor.trim().replaceAll("\\s+", " ");
    }

    private String criarChave(Endereco endereco) {
        return List.of(
                        chaveTexto(endereco.getCep()),
                        chaveTexto(endereco.getLogradouro()),
                        chaveTexto(endereco.getNumero()),
                        chaveTexto(endereco.getComplemento()),
                        chaveTexto(endereco.getBairro()),
                        chaveTexto(endereco.getCidade()),
                        chaveTexto(endereco.getUf()))
                .stream()
                .collect(Collectors.joining("|"));
    }

    private String chaveTexto(String valor) {
        return Objects.toString(valor, "").trim().replaceAll("\\s+", " ")
                .toLowerCase(LOCALIDADE_BRASILEIRA);
    }
}
