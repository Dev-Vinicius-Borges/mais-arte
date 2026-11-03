import Image from "next/image";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/dist/client/link";

interface artistCardProps {
    nome: string;
    tipos: string[];
    endereco: string;
}

export default function ArtistCard(props: artistCardProps) {
    const tamanhos = ["lg", "md", "sm"];

    let tamanho;
    const [tamanhoAleatorio] = useState(
        () => tamanhos[Math.floor(Math.random() * tamanhos.length)]
    );

    if (tamanhoAleatorio == "lg") {
        tamanho = "h-150";
    } else if (tamanhoAleatorio == "md") {
        tamanho = "h-115";
    } else if (tamanhoAleatorio == "sm") {
        tamanho = "h-80";
    }

    return (

        <div className={`relative rounded-lg ${tamanho}`}>
            <Image src="https://picsum.photos/2080/1000" width={500} height={500} alt="" className=" rounded-lg absolute size-full z-0 object-cover" />
            <div className="flex flex-col justify-end p-4 size-full text-text-inverse absolute bottom-0 bg-linear-to-t from-black/80 to-black/0">
                <p className="text-xs 2xl:text-xl">Artista</p>
                <p className="text-xl 2xl:text-2xl font-semibold">{props.nome}</p>
                <p className="text-xs 2xl:text-xl text-text-tertiary">{props.tipos.join(" | ")}</p>
                <Link href="/" className="p-2 rounded-full hover:bg-slate-600 bg-transparent w-fit">
                    <FaArrowRight />
                </Link>
            </div>
        </div>

    )

}