import brandType from "@root/utils/brandType";
import Link from "next/link";

interface exploreSectionProps {
    title: string;
    content: {
        text: string;
        linkUrl: string;
    }[];
    color: brandType;
};

export default function ExploreSection(props: exploreSectionProps) {
    return (
        <div className="flex flex-col gap-2 p-2.5">
            <p
                className="text-lg font-semibold"
                style={{ color: `var(--color-brand-${props.color})` }}
            >
                {props.title}
            </p>
            {
                props.content.map((element, index) => (
                    <Link key={index} className="text-text-inverse hover:text-text-link-hover" href={element.linkUrl}>
                        {element.text}
                    </Link>
                ))
            }
        </div>
    )
}