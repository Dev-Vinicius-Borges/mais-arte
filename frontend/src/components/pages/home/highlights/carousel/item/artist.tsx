import Image from "next/image";
import { ReactNode } from "react";
import { TbCategory2 } from "react-icons/tb";

interface ArtistCarouselItemProps {
    type: string;
    name: string;
    category: {
        type: string;
        styles: string[]
    };
    resume: string;
    pathUrl: string;
    imageUrl: string;
    children: ReactNode;
    visible: boolean;
}

export default function ArtistCarouselItem(props: ArtistCarouselItemProps) {
    return (
        <>
            <section className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${props.visible ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"}`}>
                <Image src={props.imageUrl} alt="item do carrosel" width={2000} height={1000} className={`size-full absolute -z-10 object-none`} />
                <section className="size-full bg-linear-100 from-black to-black/50 -z-9">
                    <div className="absolute top-1/2 left-1/2 transform -translate-1/2 w-11/12 m-auto">
                        <p className={`text-neutral-500 text-2xl`}>{props.type}</p>
                        <h1 className={`text-neutral-50 text-7xl`}>{props.name}</h1>
                        <span className="flex gap-2 items-center">
                            <TbCategory2 className={`text-neutral-500 text-2xl`} />
                            <p className={`text-neutral-500 text-2xl`}>{props.category.type} - {props.category.styles.join(", ")}</p>
                        </span>
                        <p className={`text-neutral-500 text-2xl`}>{props.resume}</p>
                        {props.children}
                    </div>
                </section>
            </section>
        </>
    )
}