import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { ReactNode } from "react";
import CarouselTag from "../carousel-tag";

interface EventCarouselItemProps {
    type: string;
    title: string;
    startDate: Date;
    endDate: Date;
    local: string;
    imageUrl: string;
    children: ReactNode;
    pathUrl: string;
    tags: string[];
    visible: boolean;
}

export default function EventCarouselItem(props: EventCarouselItemProps) {
    const date = {
        start: props.startDate.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).split(" "),
        end: props.endDate.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).split(" ")
    }

    return (
        <>
            <section className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${props.visible ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
                <Image src={props.imageUrl} alt="item do carrosel" width={2000} height={1000} className={`size-full absolute -z-10 object-none`} />
                <section className="size-full bg-linear-100 from-black to-black/50 -z-9">
                    <div className="absolute top-1/2 left-1/2 transform -translate-1/2 w-11/12 m-auto flex flex-col gap-4">
                        <span>
                            <p className={`text-neutral-500 text-2xl`}>{props.type}</p>
                            <h1 className={`text-neutral-50 text-7xl`}>{props.title}</h1>
                            <div className={`flex gap-8`}>
                                <span className="flex gap-2 items-center">
                                    <FaRegCalendar className={`text-neutral-500 text-2xl`} />
                                    <p className={`text-neutral-500 text-2xl`}>{date.start[0]} - {date.end[0]} {date.end[2].toUpperCase()} {date.end[4]}</p>
                                </span>
                                <span className="flex gap-2 items-center">
                                    <FiMapPin className={`text-neutral-500 text-2xl`} />
                                    <p className={`text-neutral-500 text-2xl`}>{props.local}</p>
                                </span>
                            </div>
                        </span>
                        <span className="flex gap-4">
                            {
                                props.tags.map((element, index) => (
                                    <CarouselTag text={element} key={index} />
                                ))
                            }
                        </span>
                        {props.children}
                    </div>
                </section>
            </section>
        </>
    )
}