"use client";

import { useEffect, useState } from "react";
import EventCard from "../cards/events";
import GoTo from "../go-to";
import { buscarEventosProximos, type EventoParaCard } from "@root/integrations/connectors/eventos";

export default function UpcomingEvents() {
    const [eventos, setEventos] = useState<EventoParaCard[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        buscarEventosProximos(4)
            .then((resposta) => {
                if (resposta.success) {
                    setEventos(resposta.data);
                } else {
                    setDeuErro(true);
                }
            })
            .finally(() => setCarregando(false));
    }, []);

    return (
        <section>
            <div className="flex justify-between w-full mb-8">
                <p className="text-2xl text-neutral-100">Próximos eventos</p>
                <GoTo pathUrl="/busca" text="Ver mais" />
            </div>

            {carregando && <p className="text-neutral-400">Carregando...</p>}
            {deuErro && <p className="text-neutral-400">Não foi possível carregar os eventos.</p>}
            {!carregando && !deuErro && eventos.length === 0 && (
                <p className="text-neutral-400">Nenhum evento por enquanto.</p>
            )}

            <section className="grid grid-cols-4 gap-8">
                {eventos.map((e) => (
                    <EventCard key={e.id} date={e.date} title={e.title} local={e.local} imageUrl={e.imageUrl} />
                ))}
            </section>
        </section>
    );
}