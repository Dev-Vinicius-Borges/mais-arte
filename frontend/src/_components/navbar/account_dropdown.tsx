import Image from "next/image";

interface AccountDropdownProps {
    imageUrl: String;   
}

export default function AccountDropdown(props: AccountDropdownProps) {

    return(

        <div>
            <Image
                src={props.imageUrl as string}
                alt="Imagem"
                width={40}
                height={40}
                className="rounded-full"
                aspect-ratio="1/1"
            />
        </div>

    )

}