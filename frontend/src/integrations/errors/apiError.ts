export type apiError = {
    code: string;

    message: string;

    status?: number;

};

//define o formato do erro, tratando ele por código, mensagem de erro
//e status (quando disponível. o TypeScript não retorna status dependendo do erro)