"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Footer from "@components/global/footer/footer";
import Navbar from "@components/global/navbar/navbar";
import SearchField from "@components/global/searchbar/input-search";
import FilterField from "@components/global/searchbar/input-filter";
import ArtistCard from "@root/components/pages/busca/artist-card";
import EventCard from "@root/components/pages/busca/event-card";
import EspacoCard from "@root/components/pages/busca/espaco-card";
import { listarTudo, filtrarPorTexto, type CardBusca, type TipoBusca } from "@root/integrations/connectors/busca";

const OPCOES_FILTRO = [
    { label: "Todos", value: "" },
    { label: "Artistas", value: "artista" },
    { label: "Espaços", value: "espaco_cultural" },
    { label: "Eventos", value: "evento" },
];

export default function Page() {
    const [search, setSearch] = useState("");
    const [filtro, setFiltro] = useState<TipoBusca | "">("");
    const [todos, setTodos] = useState<CardBusca[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        listarTudo()
            .then((resposta) => {
                if (resposta.success) {
                    setTodos(resposta.data);
                } else {
                    setDeuErro(true);
                }
            })
            .finally(() => setCarregando(false));
    }, []);

    // a lista que aparece na tela: aplica o filtro de tipo e depois o de texto
    const visiveis = filtrarPorTexto(todos, search).filter(
        (c) => filtro === "" || c.tipo === filtro
    );

    return (
        <main className="bg-surface-inverse">
            <Navbar />
            <div className="mt-20 mb-12 w-11/12 m-auto flex gap-4">
                <SearchField
                    state={search}
                    change={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    submit={() => {}}
                />
                <FilterField
                    options={OPCOES_FILTRO}
                    value={filtro}
                    change={(e: ChangeEvent<HTMLSelectElement>) => setFiltro(e.target.value as TipoBusca | "")}
                />
            </div>

            {carregando && <p className="w-11/12 m-auto text-neutral-400">Carregando...</p>}
            {deuErro && <p className="w-11/12 m-auto text-neutral-400">Não foi possível carregar os resultados.</p>}
            {!carregando && !deuErro && visiveis.length === 0 && (
                <p className="w-11/12 m-auto text-neutral-400">Nenhum resultado encontrado.</p>
            )}

            <section className="w-11/12 m-auto grid grid-cols-4 gap-12">
                {visiveis.map((c) => {
                    if (c.tipo === "artista") {
                        return <ArtistCard key={c.chave} nome={c.nome} tipos={c.tipos} endereco={c.endereco} imageUrl={c.imageUrl} />;
                    }
                    if (c.tipo === "espaco_cultural") {
                        return <EspacoCard key={c.chave} nome={c.nome} tipos={c.tipos} endereco={c.endereco} imageUrl={c.imageUrl} />;
                    }
                    return <EventCard key={c.chave} nome={c.nome} endereco={c.endereco} imageUrl={c.imageUrl} />;
                })}
            </section>

            <Footer />
        </main>
    )
}