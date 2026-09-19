import callendar from "@assets/icon_callendar.svg"
import pin from "@assets/icon_map_pin.svg"
import Image from "next/image"

export default function CarrouselDetail({data, nome}: {data: string, nome: string}) {

    return(

        <div className="flex gap-8">
            <div className="flex gap-8">
                <div className="flex gap-1">
                    <Image
                        src={callendar}
                        alt="Calendário"
                    />
                    <div className="text-2xl text-neutral-500">
                        {data}
                    </div>
                </div>
            </div>
            <div className="flex gap-1">
                <Image
                    src={pin}
                    alt="Pin"
                />
                <div className="text-2xl text-neutral-500">
                    {nome}
                </div>
            </div>
        </div>

    )

}