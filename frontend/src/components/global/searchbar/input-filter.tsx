import { RiArrowDropDownLine } from "react-icons/ri";

interface FilterFieldProps {
    options: string[];
};

export default function FilterField(props: FilterFieldProps) {

    return (
        <>
            <section className="appearence-none bg-surface-foreground-2 px-4 p-2 rounded-full flex justify-between w-2/12">
                <select name="filtro" defaultValue="" className="w-full appearance-none">
                    {
                        props.options.map((element, index) => (
                            <option key={index} value={element}>{element}</option>
                        ))
                    }
                </select>
                <div className="flex items-center">
                    <RiArrowDropDownLine width={32}/>
                </div>
            </section >
        </>
    )

}