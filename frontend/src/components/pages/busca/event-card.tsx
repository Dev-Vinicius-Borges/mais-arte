import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/dist/client/link";

interface eventCardProps{

    nome: string;
    endereco: string;

}

export default function EventCard(props: eventCardProps){
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

        <div className={`relative rounded-lg ${tamanho}`}>
            <Image src="https://picsum.photos/2085/1000" width={500} height={500} alt="" className="rounded-lg absolute size-full z-0 object-cover"/>
            <div className="flex flex-col gap-1 p-4 h-fit w-full text-text-inverse absolute bottom-0 bg-linear-to-t from-black/80 to-black/0">
                <p className="text-xs 2xl:text-xl">Evento</p>
                <p className="text-xl 2xl:text-2xl font-semibold">{props.nome}</p>
                <p className="text-xs 2xl:text-xl text-text-tertiary">{props.endereco}</p>
                <Link href="/" className="p-2 rounded-full hover:bg-slate-600 bg-transparent w-fit">
                    <FaArrowRight />
                </Link>
            </div>
        </div>

    )

}