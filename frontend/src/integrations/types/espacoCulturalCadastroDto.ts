export type espacoCulturalCadastroDto = {
    nomeEspaco: string;
    descricao: string;
    site: string | null;
    horarioFuncionamento: Record<string, string>;
    capacidadeMaxima: number | null;
    publico: boolean | null;
    endereco: string;
    fotoPrincipal: string | null;
};