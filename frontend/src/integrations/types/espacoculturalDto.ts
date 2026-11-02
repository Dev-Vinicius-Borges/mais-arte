export type espacoculturalDto = {
    id: number;
    nomeEspaco: string;
    descricao: string;
    site: string;
    horarioFuncionamento: Record<string, string>;
    capacidadeMaxima: number | null;
    publico: boolean;
    endereco: string;
    fotoPrincipal: string;
    reputacaoScore: number;
    verificado: boolean;
    ativo: boolean;
};