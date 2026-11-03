import type { apiError } from "../errors/apiError";

export type  Success<T> = {
    success: true;
    data: T;
};

export type Failure = {
    success: false;
    error: apiError;
};

export type ApiResponse<T> =  Success<T> | Failure;
//define se a resposta entregue pela API foi bem sucedida ou se algum erro foi encontrado no caminho.
//se o status "success" retornrar true, significa que a resposta chegou sem nenhum erro, logo, são trazidos os dados requeridos
//se o status "success" retornar false, significa que algum erro ocorreu durante o processo, retornando o ApiError. que é padronizado 
//e tratado na folder errors.
