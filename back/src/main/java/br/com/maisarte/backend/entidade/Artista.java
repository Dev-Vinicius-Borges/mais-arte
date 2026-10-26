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
@Table(name = "perfil_artista", schema = "public")
public class Artista extends ConteudoBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_perfil_artista")
    private Long identificador;

    @Column(name = "nome_artistico", length = 150)
    private String nomeArtistico;

    @Column(name = "bio_profissional", columnDefinition = "text")
    private String biografiaProfissional;

    @Column(name = "data_inicio_atividade")
    private LocalDate dataInicioAtividade;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "generos_musicais", columnDefinition = "jsonb", nullable = false)
    private List<String> generosMusicais = new ArrayList<>();

    public Long getIdentificador() {
        return identificador;
    }

    public String getNomeArtistico() {
        return nomeArtistico;
    }

    public void setNomeArtistico(String nomeArtistico) {
        this.nomeArtistico = nomeArtistico;
    }

    public String getBiografiaProfissional() {
        return biografiaProfissional;
    }

    public void setBiografiaProfissional(String biografiaProfissional) {
        this.biografiaProfissional = biografiaProfissional;
    }

    public LocalDate getDataInicioAtividade() {
        return dataInicioAtividade;
    }

    public void setDataInicioAtividade(LocalDate dataInicioAtividade) {
        this.dataInicioAtividade = dataInicioAtividade;
    }

    public List<String> getGenerosMusicais() {
        return generosMusicais;
    }

    public void setGenerosMusicais(List<String> generosMusicais) {
        this.generosMusicais = generosMusicais;
    }
}
