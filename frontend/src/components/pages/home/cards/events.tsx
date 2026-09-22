import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

interface EventCardProps {
    date: Date;
    title: string;
    local: string;
    imageUrl: string;
};

export default function EventCard(props: EventCardProps){
    const date = props.date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).split(" ");

    return (
        <div className={`relative h-50 rounded-sm`}>
            <Image src={props.imageUrl} alt={props.title} width={200} height={100} className={`absolute z-0 size-full object-cover`}/>
            <div className="absolute size-full bg-linear-to-t from-black to-black/20 z-10 flex flex-col justify-between p-4">
                <span className="flex flex-col" >
                    <p className={`text-neutral-200 text-xs`}>{date[0]} {date[2]} {date[4]}</p>
                    <p className={`text-neutral-50 text-2xl font-semibold`}>{props.title}</p>
                    <div className="flex flex-row gap-2">
                        <FiMapPin className={`text-neutral-50 text=xs`}/>
                        <p className={`text-neutral-200 text-xs`}>{props.local}</p>
                    </div>
                </span>
                <button className={`self-end`}>
                    <FaArrowRight className="text-2xl text-brand-culture"/>
                </button>
            </div>
        </div>
    )
}