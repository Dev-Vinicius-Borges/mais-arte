package br.com.maisarte.backend.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class ConteudoBase {
    @Column(name = "foto_principal", length = 255)
    private String fotoPrincipal;

    @Column(name = "reputacao_score", nullable = false)
    private double pontuacaoReputacao;

    @Column(nullable = false)
    private boolean verificado;

    @Column(nullable = false)
    private boolean ativo = true;

    public String getFotoPrincipal() {
        return fotoPrincipal;
    }

    public void setFotoPrincipal(String fotoPrincipal) {
        this.fotoPrincipal = fotoPrincipal;
    }

    public double getPontuacaoReputacao() {
        return pontuacaoReputacao;
    }

    public void setPontuacaoReputacao(double pontuacaoReputacao) {
        this.pontuacaoReputacao = pontuacaoReputacao;
    }

    public boolean isVerificado() {
        return verificado;
    }

    public void setVerificado(boolean verificado) {
        this.verificado = verificado;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
