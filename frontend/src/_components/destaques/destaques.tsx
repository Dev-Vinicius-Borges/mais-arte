import Image from "next/image";
import CarrouselDetail from "../carousel/carousel-detail";
import arrow from "@assets/icon_arrow.svg"
import CarouselTag from "../carousel/carousel-tag";

export default function Destaques(){

    return(

        <div>
            <span className="bg-slate-950 w-full h-fit flex">
                <div className="flex gap-4 p-12 bg-slate-300 w-full h-fit">
                    <div className="flex gap-4 bg-surface-inverse flex-col w-7/12 h-fit">
                        <div className="text-2xl text-neutral-500">
                            Evento
                        </div>
                        <div className="text-7xl text-text-inverse">
                            Festival de Arte de Curitiba
                        </div>
                        <CarrouselDetail data="12 - 15 SET 2026" nome="Centro Cultural Aurora" /> 
                        <div className="flex gap-4">
                            <CarouselTag texto="Musica" />
                            <CarouselTag texto="Musica" />
                            <CarouselTag texto="Musica" />
                        </div>
                        <div className="flex gap-3 p-2.5 items-center">
                            <div className="text-2xl text-neutral-500">
                                Ver detalhes
                            </div>
                            <Image
                                src={arrow}
                                alt="Seta"
                            />
                        </div>
                    </div>
                </div>
            </span>
        </div>

    )

}