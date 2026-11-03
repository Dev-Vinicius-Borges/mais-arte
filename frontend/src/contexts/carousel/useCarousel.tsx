"use client";

import { useContext } from "react";
import { CarouselStateContext } from "./carouselContext";

export default function useCarousel() {
    const context = useContext(CarouselStateContext);
    if (!context) {
        throw new Error("useCarousel deve estar dentro de um CarouselStateProvider");
    }

    return context;
}