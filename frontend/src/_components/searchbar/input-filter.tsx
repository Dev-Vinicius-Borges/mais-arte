import { RiArrowDropDownLine } from "react-icons/ri";

interface FilterFieldProps{
    options: string[];
};

export default function FilterField(props: FilterFieldProps) {

    return (
        <section className="appearence-none bg-surface-foreground-2 py-2 px-2 rounded-full flex justify-between w-2/12">
            
            <select name="filtro" defaultValue="" className="">
                <option value="" disabled hidden Filtro </option>
                {props.options.map((element, index) => (<option key={index} values={element}>{element}</option></option>))}
            </select>
            <div className="flex items-center">
                <RiArrowDropDownLine/>
            </div>
        </section>
    )

}