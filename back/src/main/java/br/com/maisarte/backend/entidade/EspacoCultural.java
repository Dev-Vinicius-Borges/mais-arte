package br.com.maisarte.backend.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "espaco_cultural", schema = "public")
public class EspacoCultural extends ConteudoBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_espaco_cultural")
    private Long identificador;

    @Column(name = "nome_espaco", nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, columnDefinition = "text")
    private String descricao;

    @Column(length = 255)
    private String site;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "horario_funcionamento", columnDefinition = "jsonb", nullable = false)
    private Map<String, String> horarioFuncionamento = new HashMap<>();

    @Column(name = "capacidade_maxima")
    private Integer capacidadeMaxima;

    @Column(nullable = false)
    private boolean publico = true;

    @Column(columnDefinition = "text")
    private String endereco;

    @ManyToMany(mappedBy = "espacosCulturais")
    private Set<Evento> eventos = new LinkedHashSet<>();

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

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public Map<String, String> getHorarioFuncionamento() {
        return horarioFuncionamento;
    }

    public void setHorarioFuncionamento(Map<String, String> horarioFuncionamento) {
        this.horarioFuncionamento = horarioFuncionamento;
    }

    public Integer getCapacidadeMaxima() {
        return capacidadeMaxima;
    }

    public void setCapacidadeMaxima(Integer capacidadeMaxima) {
        this.capacidadeMaxima = capacidadeMaxima;
    }

    public boolean isPublico() {
        return publico;
    }

    public void setPublico(boolean publico) {
        this.publico = publico;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }
}
