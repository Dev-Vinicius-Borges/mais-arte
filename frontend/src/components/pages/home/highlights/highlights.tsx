"use client";

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

async function fetchHighlights(): Promise<Highlight[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve([
            { 
                type: "Evento",
                title: "Festival de arte", 
                startDate: new Date(2026, 8, 10), 
                endDate: new Date(2026, 9, 20), 
                local: "Praça do japão", 
                imageUrl: "https://picsum.photos/2000/1000", 
                pathUrl: "/evento/0", 
                tags: ["Música", "Dança"], 
                visible: true 
            },
            { 
                type: "Artista", 
                category: { 
                    type: "Música", 
                    styles: ["MPB"] 
                }, 
                imageUrl: "https://picsum.photos/2100/1000", 
                name: "Janine Mathias", 
                pathUrl: "/artista/0",
                resume: "lorem ipsum sit dolor amet consectetur", 
                visible: false 
            },
            { 
                type: "Espaço Cultural", 
                imageUrl: "https://picsum.photos/2200/1000", 
                local: "Centro", 
                pathUrl: "/espaco/0", 
                resume: "Lorem ipsum sit dolor amet consectetur", 
                tags: ["Exposições", "Teatro", "Oficina"], 
                title: "Centro Cultural", 
                visible: false 
            }
        ]), 500);
    });
}

export default function Highlights() {
    const { actualItem, next, previous, setItems } = useCarousel();
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    useEffect(() => {
        fetchHighlights().then((items) => {
            setHighlights(items);
            setItems(items.length);
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
