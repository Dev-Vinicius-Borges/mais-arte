import Link from "next/link";
import Image from "next/image";
import logo from "@assets/logo_mais_arte.svg";
import ExploreSection from "./explore-section";
import brandType from "@/_utils/types/brandType";

export default function Footer() {

    const explorar = [
        {
            text: "Eventos",
            linkUrl: "/eventos"
        },
        {
            text: "Artistas",
            linkUrl: "/artistas"
        },
        {
            text: "Espaços",
            linkUrl: "/espacos"
        },
    ];

    const participar = [
        {
            text: "Criar evento",
            linkUrl: "/criarEvento"
        },
        {
            text: "Cadastrar artista",
            linkUrl: "/cadastrarArtista"
        },
        {
            text: "Cadastrar espaço",
            linkUrl: "/cadastrarEspacos"
        },
    ];

    const maisArte = [
        {
            text: "Sobre",
            linkUrl: "/sobre"
        },
        {
            text: "Contato",
            linkUrl: "/contato"
        },
        {
            text: "Privacidade",
            linkUrl: "/privacidade"
        },
    ];

    return (

        <footer>

            <section className="flex justify-between w-full h-fit py-8 bg-surface-inverse">
                <Image
                    src={logo}
                    alt="Logo"
                    className="aspect-square h-full w-32"
                />
                <div className="flex gap-8">
                    <div className="flex gap-8 p-2.5">

                        <ExploreSection title="Explorar" content={explorar} color={brandType.discovery} />
                        <ExploreSection title="Participar" content={participar} color={brandType.community} />
                        <ExploreSection title="+Arte" content={maisArte} color={brandType.culture} />

                    </div>
                </div>

            </section>

            <section className="w-full h-full px-4 bg-surface-inverse text-text-inverse">
                <div className="flex justify-between w-11/12 m-auto">
                    <div>
                        <p>
                            Mais Arte
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/termos">
                            Termos
                        </Link>
                        <Link href="/privacidade">
                            Privacidade
                        </Link>
                    </div>
                </div>
            </section>

        </footer>

    )

}