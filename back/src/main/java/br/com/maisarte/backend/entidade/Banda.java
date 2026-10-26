package br.com.maisarte.backend.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "banda", schema = "public")
public class Banda extends ConteudoBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_banda")
    private Long identificador;

    @Column(name = "nome_banda", nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, columnDefinition = "text")
    private String descricao;

    @Column(name = "data_formacao", nullable = false)
    private LocalDate dataFormacao;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "generos_musicais", columnDefinition = "jsonb", nullable = false)
    private List<String> generosMusicais = new ArrayList<>();

    public Long getIdentificador() {
        return identificador;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataFormacao() {
        return dataFormacao;
    }

    public void setDataFormacao(LocalDate dataFormacao) {
        this.dataFormacao = dataFormacao;
    }

    public List<String> getGenerosMusicais() {
        return generosMusicais;
    }

    public void setGenerosMusicais(List<String> generosMusicais) {
        this.generosMusicais = generosMusicais;
    }
}
