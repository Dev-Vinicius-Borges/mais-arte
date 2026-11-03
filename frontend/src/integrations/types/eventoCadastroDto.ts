export type eventoCadastroDto = {
    nomeEvento: string;
    descricao: string;
    dataEvento: string;
    horaInicio: string;
    horaFim: string | null;
    urlCartaz: string | null;
    linkIngresso: string | null;
    precoIngresso: number;
    endereco: string;
    espacosCulturais: number[];
    fotoPrincipal: string | null;
};