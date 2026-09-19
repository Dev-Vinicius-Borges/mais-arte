import Link from "next/dist/client/link";

export default function NavItem({texto, link}: {texto: string, link: string}) {

  
    return(

        <Link href={link} className="border-3 hover:border-b-text-primary z-1 bottom-0 left-0 w-fit border-transparent gap-9 pb-3 flex items-end text-xl">
            {texto}
        </Link>

    )

}