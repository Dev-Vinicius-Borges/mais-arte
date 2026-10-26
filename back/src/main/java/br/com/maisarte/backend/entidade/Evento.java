package br.com.maisarte.backend.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "evento", schema = "public")
public class Evento extends ConteudoBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento")
    private Long identificador;

    @Column(name = "nome_evento", nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, columnDefinition = "text")
    private String descricao;

    @Column(name = "data_evento", nullable = false)
    private LocalDate dataEvento;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fim")
    private LocalTime horaFim;

    @Column(name = "url_cartaz", length = 255)
    private String urlCartaz;

    @Column(name = "link_ingresso", length = 255)
    private String linkIngresso;

    @Column(name = "preco_ingresso", nullable = false, precision = 10, scale = 2)
    private BigDecimal precoIngresso = BigDecimal.ZERO;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fk_id_endereco", nullable = false)
    private Endereco endereco;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "evento_espaco_cultural",
            schema = "public",
            joinColumns = @JoinColumn(name = "id_evento"),
            inverseJoinColumns = @JoinColumn(name = "id_espaco_cultural"))
    private Set<EspacoCultural> espacosCulturais = new LinkedHashSet<>();

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

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate dataEvento) {
        this.dataEvento = dataEvento;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFim() {
        return horaFim;
    }

    public void setHoraFim(LocalTime horaFim) {
        this.horaFim = horaFim;
    }

    public String getUrlCartaz() {
        return urlCartaz;
    }

    public void setUrlCartaz(String urlCartaz) {
        this.urlCartaz = urlCartaz;
    }

    public String getLinkIngresso() {
        return linkIngresso;
    }

    public void setLinkIngresso(String linkIngresso) {
        this.linkIngresso = linkIngresso;
    }

    public BigDecimal getPrecoIngresso() {
        return precoIngresso;
    }

    public void setPrecoIngresso(BigDecimal precoIngresso) {
        this.precoIngresso = precoIngresso;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Set<EspacoCultural> getEspacosCulturais() {
        return espacosCulturais;
    }

    public void setEspacosCulturais(Set<EspacoCultural> espacosCulturais) {
        this.espacosCulturais = espacosCulturais;
    }
}
