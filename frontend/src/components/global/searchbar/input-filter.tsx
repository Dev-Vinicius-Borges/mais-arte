import { ChangeEvent } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface FilterFieldProps {
    options: { label: string; value: string }[];
    value: string;
    change: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function FilterField(props: FilterFieldProps) {
    return (
        <section className="appearence-none bg-surface-foreground-2 px-4 p-2 rounded-full flex justify-between w-2/12">
            <select name="filtro" value={props.value} onChange={props.change} className="w-full appearance-none">
                {props.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            <div className="flex items-center">
                <RiArrowDropDownLine width={32}/>
            </div>
        </section>
    )
}