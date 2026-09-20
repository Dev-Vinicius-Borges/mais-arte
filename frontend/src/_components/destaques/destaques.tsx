import CarrouselDetail from "../carousel/carousel-detail";
import Image from "next/image";
import CarouselTag from "../carousel/carousel-tag";

export default function Destaques() {

    return (
        <>
            <section className={`w-full h-dvh`}>
                <div className={`mt-18 relative w-full h-full`}>
                    <Image src={`https://picsum.photos/2000/1000`} alt="" width={2000} height={1000} className="size-full absolute z-0" draggable={false} />
                    <div className="absolute inset-0 z-1 bg-linear-100 from-black via-black/75 to-transparent size-full">
                        <p className="text-2xl text-neutral-500">
                            Evento
                        </p>
                        <h1 className="text-7xl text-text-inverse">
                            Festival de Arte de Curitiba
                        </h1>
                        <CarrouselDetail data-inicial={new Date("2003-01-01")} data-final={new Date()} local="Centro Cultural Aurora" />
                        <div className="flex flex-row gap-4">
                            <CarouselTag texto="Musica" />
                            <CarouselTag texto="Musica" />
                            <CarouselTag texto="Musica" />
                        </div>
                        <div className="flex gap-3 p-2.5 items-center">
                            <div className="text-2xl text-neutral-500">
                                Ver detalhes
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
