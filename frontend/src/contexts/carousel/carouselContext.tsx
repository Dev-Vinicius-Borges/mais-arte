"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

interface CarouselStateContextProps {
    actualItem: number;
    next: (actual: number) => void;
    previous: (actual: number) => void;
    items: number;
    setItems: Dispatch<SetStateAction<number>>;
}

const CarouselStateContext = createContext<CarouselStateContextProps | null>(null);

interface CarouselStateProviderProps {
    children: ReactNode;
}

function CarouselStateProvider(props: CarouselStateProviderProps): ReactNode {
    const [actualItem, setActualItem] = useState(0);
    const [qtdItems, setQtdItems] = useState(0);

    const handleNext = useCallback((actual: number) => {
        if (qtdItems > 0) {
            setActualItem((actual + 1) % qtdItems);
        }
    }, [qtdItems]);

    const handlePrevious = useCallback((actual: number) => {
        if (qtdItems > 0) {
            setActualItem((actual - 1 + qtdItems) % qtdItems);
        }
    }, [qtdItems]);


    return (
        <CarouselStateContext.Provider value={{ actualItem, next: handleNext, previous: handlePrevious, items: qtdItems, setItems: setQtdItems }}>
            {props.children}
        </CarouselStateContext.Provider>
    )
}

export { CarouselStateContext, CarouselStateProvider };