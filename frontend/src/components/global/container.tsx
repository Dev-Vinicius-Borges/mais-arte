import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    background: "dark" | "light";
}

export default function Container(props: ContainerProps){
    return (
        <div className={`w-full ${props.background == "dark" ? "bg-surface-inverse" : "bg-surface-background"} py-8`}>
            <section className={`w-11/12 m-auto`}>
                {props.children}
            </section>
        </div>
    )
}