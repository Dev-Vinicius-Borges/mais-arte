import Link from "next/link";
import Image from "next/image";
import logo from "@assets/logo_mais_arte.svg";
import ExploreSection from "./explore-section";
import FooterHero from "./hero";
import brandType from "@root/utils/brandType";

export default function Footer() {

    const ano = new Date().getFullYear();

    const exploreLinks = [
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

    const participationLinks = [
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

    const companyLinks = [
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
            <FooterHero/>
            <section className="h-fit py-8 bg-surface-inverse border-b-2 border-border-tertiary">
                <div className="flex justify-between w-11/12 m-auto">
                    <Image
                        src={logo}
                        alt="Mais Arte"
                        className="aspect-square h-full w-32"
                    />
                    <div className="flex gap-8 p-2.5">
                        <ExploreSection title="Explorar" content={exploreLinks} color={brandType.discovery} />
                        <ExploreSection title="Participar" content={participationLinks} color={brandType.community} />
                        <ExploreSection title="+Arte" content={companyLinks} color={brandType.culture} />
                    </div>
                </div>
            </section>
            <section className="py-4 bg-surface-inverse text-text-inverse">
                <div className="flex justify-between w-11/12 m-auto">
                    <p>&copy; {ano} +Arte</p>
                    <div className="flex gap-4 [&>]:hover:text-text-link-hover">
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