export async function buscarArtista(){
    try{

        const busca = await fetch("http://localhost:3333/api/v1/artists",{
            method: "GET"
        });

        const resultado = await busca.json();

        return resultado.data;

    }catch(erro){
        console.error(erro);
        
    }
}

export async function buscarEspaco(){

    const busca = await fetch("http://localhost:3333/api/v1/spaces/");
    console.log(buscarEspaco);
}

export async function buscarBanda(){

    const busca = await fetch("http://localhost:3333/api/v1/bands/");
    console.log(buscarBanda);
}

export async function buscarEvento(){

    const busca = await fetch("http://localhost:3333/api/v1/events/");
    console.log(buscarEvento);
}