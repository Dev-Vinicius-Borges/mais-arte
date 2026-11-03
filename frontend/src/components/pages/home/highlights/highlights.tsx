"use client";

import { buscarDestaques } from "@root/integrations/connectors/destaques";
import { useEffect, useState } from "react";
import useCarousel from "@root/contexts/carousel/useCarousel"
import CarouselNavigator from "./carousel/carousel-navigator";
import EventCarouselItem from "./carousel/item/event";
import ArtistCarouselItem from "./carousel/item/artist";
import PlaceCarouselItem from "./carousel/item/place";
import { event as EventT } from "@root/types/carousel/event";
import { ArtistT } from "@root/types/carousel/artist";
import { PlaceT } from "@root/types/carousel/place";

type Highlight = EventT | ArtistT | PlaceT;


export default function Highlights() {
    const { actualItem, next, previous, setItems } = useCarousel();
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    useEffect(() => {
    buscarDestaques().then((resposta) => {
        if (resposta.success) {
            setHighlights(resposta.data);
            setItems(resposta.data.length);
        }
    });
}, [setItems]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            next(actualItem);
        }, 8000);

        return () => clearInterval(intervalId);
    }, [actualItem, next]);

    const totalHighlights = highlights.length;

    return (
        <section className="relative w-full h-dvh overflow-hidden">
            {highlights.map((highlight, index) => {
                const navigator = (
                    <CarouselNavigator
                        actualIndex={actualItem}
                        next={next}
                        previous={previous}
                        totalItems={totalHighlights}
                    />
                );

                if (highlight.type === "Evento") {
                    return <EventCarouselItem key={index} {...highlight} visible={index === actualItem}>{navigator}</EventCarouselItem>;
                }

                if (highlight.type === "Artista") {
                    return <ArtistCarouselItem key={index} {...highlight} visible={index === actualItem}>{navigator}</ArtistCarouselItem>;
                }

                return <PlaceCarouselItem key={index} {...highlight} visible={index === actualItem}>{navigator}</PlaceCarouselItem>;
            })}
        </section>
    )

}
