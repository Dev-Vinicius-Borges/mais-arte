interface CarouselTag {
    text: string;
}

export default function CarouselTag(props: CarouselTag) {
    return(
        <div className="px-4 py-2 border-2 flex justify-center items-center border-neutral-700 rounded-full text-2xl text-neutral-500">
            {props.text}
        </div>
    )
}