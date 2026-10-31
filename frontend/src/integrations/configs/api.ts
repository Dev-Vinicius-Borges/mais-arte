export const api_url = process.env.NEXT_PUBLIC_API_URL;
//cria uma variavel constante de endereco padrao da API
//garante que o endereco do backend seja unificado, garantindo que, em caso de
//alteracao de endereco nos controllers, apenas a constante necessite ser alterada.

if(!api_url){
    throw new Error("api_url nao foi definida nas variaveis de ambiente.");
}
//verifica se o endereco padrao da API foi definido
//caso seja detectado que o endereco padrao da API nao foi preenchido
//o codigo emite a mensagem de erro e corta o processo.