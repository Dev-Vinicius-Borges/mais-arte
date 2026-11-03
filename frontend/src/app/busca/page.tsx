"use client";


import Footer from "@components/global/footer/footer";
import Navbar from "@components/global/navbar/navbar";
import ArtistCard from "@root/components/pages/busca/artist-card";
import EventCard from "@root/components/pages/busca/event-card";
import EspacoCard from "@root/components/pages/busca/espaco-card";
import SearchField from "@components/global/searchbar/input-search";
import { cloneElement, useEffect, useState, type ChangeEvent } from "react";
import FilterField from "@components/global/searchbar/input-filter";
import { buscarArtista } from "../../service/integracao";

export default function Page() {
    const [search, setSearch] = useState<string>("");
    const nomes =["Vinicius Borgtes", "Lucas Báhguets", "Caue Barbiado", "Vinicius Morrer"];
    const [nomeAleatorio] = useState(
        () => nomes[Math.floor(Math.random() * nomes.length)]);
    const nomesEspaco =["Museu do Olho", "Passeio Público", "Jardim Botânico", "Vinicius Morrer"];
    const [nomeEspacoAleatorio] = useState(
        () => nomes[Math.floor(Math.random() * nomes.length)]);
    
    
    const cards = [
        <ArtistCard nome={nomeAleatorio} tipos={["Musica", "Dança"]} endereco="" key={0} />,
        <EventCard nome="Centralizar div" endereco="Rua HTML - 5" key={67} />,
        <EspacoCard nome={nomeEspacoAleatorio} tipos={["Yuri", "Yaoi"]} endereco="Rua Baraão do Rio Preto - 67" key={69} />
    ];

    const teste = async () => {
        const dados = await buscarArtista();
        dados.array.forEach((dado) => {
            cards.push(<ArtistCard nome={dado.nome} endereco="" tipos={dado.generos_musicais} key={dado.id_pefil_artista}/>)
        });
    };



    useEffect(()=>{
        teste();
    },[])

    return (
        <main className="bg-surface-inverse">
            <Navbar />
            <div className="mt-20 mb-12 w-11/12 m-auto flex gap-4">
                <SearchField state={search} change={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} submit={()=>{}} />
                <FilterField options={["Artistas", "Espaços", "Eventos"]} />
            </div>

            <section className="w-11/12 m-auto grid grid-cols-4 gap-12">
                {
                    Array.from({ length: 50 }, (_, index) => {
                        const cardAleatorio = cards[index % cards.length];
                        const randomNome = nomes[index % nomes.length];
                            if (cardAleatorio.type === ArtistCard) {
                                return cloneElement(cardAleatorio, { 
                                key: index, 
                                nome: randomNome 
                                });
                            }
                            const randomNomeEspaco = nomesEspaco[index % nomesEspaco.length];
                            if (cardAleatorio.type === EspacoCard) {
                                return cloneElement(cardAleatorio, { 
                                key: index, 
                                nome: randomNomeEspaco 
                                });
                            }
                        return cloneElement(cardAleatorio, { key: index });
                    })
                }
            </section>

            <Footer />
        </main>
    )

}