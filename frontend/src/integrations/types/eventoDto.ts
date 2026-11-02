export type eventoDto = {
    id: number;
    nomeEvento: string;
    descricao: string;
    dataEvento: string;
    horaInicio: string;
    horaFim: string;
    urlCartaz: string;
    linkIngresso: string;
    precoIngresso: number;
    endereco: string;
    espacosCulturais: number[];
    fotoPrincipal: string;
    reputacaoScore: number;
    verificado: boolean;
    ativo: boolean;
};