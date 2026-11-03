import type { apiError } from "../errors/apiError";

export async function handleHttpError(response: Response): Promise<apiError> {
    
    let message = "ocorreu um erro de comunicacao com o servidor"
    try {
        const errordata = await response.json();
            if ( errordata !== null && typeof errordata === "object"){

                if ("message" in errordata){

                    if(typeof errordata.message === "string"){
                    message = errordata.message;
                }
            }
        }
    } catch (error) {
        //o catch está vazio intencionalmente, essa decisão foi tomada visto que já temos uma mensagem de erro padrão predefinida:)
    }
   


    return {
    code: `HTTP_${response.status}`,
    message: message,
    status: response.status
    };
}
//função responsável por tratar erros HTTP

export function handleUnknownError(error: unknown): apiError{
    let message = "ocorreu um erro de comunicacao com o servidor"

    if (error instanceof Error){
        message = error.message;
    }

    return{
        code: 'UNKNOWN_ERROR',
        message: message 
    };
    //função responsável por tratar erros diversos 
}
