import { ChangeEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface SearchFieldProps {
    state: string;
    change: (event: ChangeEvent<HTMLInputElement>) => void;
    submit: ()=> void;
};

export default function SearchField(props: SearchFieldProps) {

    return (
        <section className="bg-surface-foreground-2 py-2 px-2 rounded-full flex justify-between w-8/12">
            <input value={props.state} onChange={props.change} type="text" name="search" id="search" className="w-full outline-none bg-transparent" placeholder="Ex.: nome do artista, obra, evento..."/>
            <button className="bg-brand-discovery p-2 rounded-full" onClick={props.submit}>
                <IoSearchOutline className="text-text-inverse text-xl"/>
            </button>
        </section>
        // Faz aí o campo de filtro que é um select
    )

}