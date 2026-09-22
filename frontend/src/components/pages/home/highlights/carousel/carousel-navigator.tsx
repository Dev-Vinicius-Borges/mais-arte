import { useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CarouselNavigatorProps {
    totalItems: number;
    actualIndex: number;
    next: (actual: number) => void;
    previous: (actual: number) => void;
}

export default function CarouselNavigator(props: CarouselNavigatorProps) {

    const handleNext = useCallback(() => {
        props.next(props.actualIndex);
    }, [props])

    const handlePrevious = useCallback(() => {
        props.previous(props.actualIndex);
    }, [props])

    return (
        <section className={`flex gap-8`}>
            <span className="flex gap-4">
                <button className="p-4 hover:bg-neutral-200 hover:*:text-black border-2 border-border-input rounded-full" onClick={handlePrevious}>
                    <IoIosArrowBack className={`text-neutral-50 text-3xl`} />
                </button>
                <button className="p-4 hover:bg-neutral-200 hover:*:text-black border-2 border-border-input rounded-full" onClick={handleNext}>
                    <IoIosArrowForward className={`text-neutral-50 text-3xl`} />
                </button>
            </span>
            <div className="flex flex-row gap-2 items-center">
                {
                    Array.from({ length: props.totalItems }).map((_, index) => (
                        <div
                            className={`w-20 h-1 text-white ${
                                props.actualIndex === index
                                    ? "bg-neutral-50"
                                    : "bg-neutral-400"
                            }`}
                            key={index}
                        ></div>
                    ))
                }
            </div>
        </section>
    )
}