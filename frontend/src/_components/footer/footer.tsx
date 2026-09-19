import Link from "next/link";

export default function Footer(){

    return(

        <footer>

            <section>
                PenisLord
            </section>

            <section className="w-full h-full px-4 bg-surface-inverse text-text-inverse">
                <div className="flex justify-between w-11/12 m-auto">
                    <div>
                    <p>
                        Mais Arte
                    </p>
                </div>
                <div>
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