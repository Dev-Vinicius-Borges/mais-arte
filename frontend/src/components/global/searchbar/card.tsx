import { useState } from "react";

export default function Card(){
    const tamanhos = ["lg", "md", "sm"];

    let tamanho ;
    const [tamanhoAleatorio] = useState(
        () => tamanhos[Math.floor(Math.random() * tamanhos.length)]
    );

    if (tamanhoAleatorio=="lg"){
        tamanho = "h-150";
    }else if(tamanhoAleatorio=="md"){
        tamanho = "h-115";
    }else if(tamanhoAleatorio=="sm"){
        tamanho = "h-80";
    }

    return(

        <div className={`flex gap-4 p-4 border border-red-500 w-full ${tamanho} items-end justify-end`}>
            <div className="flex flex-col gap-1 p-4 h-fit border border-blue-500 w-full text-text-inverse">
                <p className="text-xs">Artista</p>
                <p className="text-lg font-semibold">Viniciuses Motter Borges</p>
                <p className="text-xs">Musga | Dança</p>
                <p>Seta</p>
            </div>
        </div>

    )

}