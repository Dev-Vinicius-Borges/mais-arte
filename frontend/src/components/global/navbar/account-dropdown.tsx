import Image from "next/image";

interface AccountDropdownProps {
    imageUrl: string;   
}

export default function AccountDropdown(props: AccountDropdownProps) {

    return(

        <div>
            <Image
                src={props.imageUrl as string}
                alt="Imagem"
                width={32}
                height={32}
                className="rounded-full h-full min-size-8 aspect-square"
            />
        </div>

    )

}