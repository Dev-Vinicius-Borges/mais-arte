export default function CarouselTag({texto}: {texto: string}) {
    return(
        <div className="flex gap-2 px-3 py-2 border-2 border-neutral-700 rounded-full text-2xl text-neutral-500">
            {texto}
        </div>
    )
}