package br.com.maisarte.backend.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "endereco", schema = "public")
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_endereco")
    private Long identificador;

    @Column(name = "chave_normalizada", nullable = false, unique = true, columnDefinition = "text")
    private String chaveNormalizada;

    @Column(length = 8)
    private String cep;

    @Column(nullable = false, columnDefinition = "text")
    private String logradouro;

    @Column(length = 30)
    private String numero;

    @Column(columnDefinition = "text")
    private String complemento;

    @Column(columnDefinition = "text")
    private String bairro;

    @Column(columnDefinition = "text")
    private String cidade;

    @Column(length = 2, columnDefinition = "char(2)")
    private String uf;

    @Column(name = "ponto_referencia", columnDefinition = "text")
    private String pontoReferencia;

    public Long getIdentificador() {
        return identificador;
    }

    public String getChaveNormalizada() {
        return chaveNormalizada;
    }

    public void setChaveNormalizada(String chaveNormalizada) {
        this.chaveNormalizada = chaveNormalizada;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getPontoReferencia() {
        return pontoReferencia;
    }

    public void setPontoReferencia(String pontoReferencia) {
        this.pontoReferencia = pontoReferencia;
    }
}
