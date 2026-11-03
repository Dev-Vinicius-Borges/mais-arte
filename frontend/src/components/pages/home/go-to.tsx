import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface GoToProps {
    pathUrl: string;
    text: string;
}

export default function GoTo(props: GoToProps){
    return (
        <Link  className="flex flex-row gap-4 *:text-lg items-center" draggable={false} href={props.pathUrl}>
            <p className={"text-neutral-50"}>{props.text}</p>
            <FaArrowRight className="text-neutral-50"/>
        </Link>
    )
}