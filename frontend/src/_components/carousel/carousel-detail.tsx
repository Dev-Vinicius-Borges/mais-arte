import callendar from "@assets/icon_callendar.svg"
import pin from "@assets/icon_map_pin.svg"
import Image from "next/image"
import { FiMapPin } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";

interface CarouselDetailProps{
    "data-inicial": Date;
    "data-final": Date;
    local: string;
}

export default function CarrouselDetail(props: CarouselDetailProps) {
    const dataInicialEncontrada = props["data-inicial"].toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "long",
                        }).split(" ");
    const dataFinalEncontrada = props["data-final"].toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }).split(" ");

    const dataFormatada = `${dataInicialEncontrada[0]} - ${dataFinalEncontrada[0]} ${dataFinalEncontrada[2]} ${dataFinalEncontrada[4]}`;

    return (

        <div className="flex gap-8">
            <div className="flex gap-8">
                <div className="flex gap-1">
                    <IoCalendarClearOutline className="text-neutral-500 size-8"/>
                    <p className="text-2xl text-neutral-500">
                        {dataFormatada}
                    </p>
                </div>
            </div>
            <div className="flex gap-1">
                <FiMapPin className="text-neutral-500 size-8"/>
                <p className="text-2xl text-neutral-500">
                    {props.local}
                </p>
            </div>
        </div>

    )

}