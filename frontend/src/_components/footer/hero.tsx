import Image from "next/image";

export default function FooterHero(){

    return(
        <Image
            src="@assets/footer_hero.svg"
            alt="Hero"
            width={100}
            height={100}
        />
    )

}