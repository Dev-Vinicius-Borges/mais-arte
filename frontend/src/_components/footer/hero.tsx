import Image from "next/image";
import hero from "@assets/footer_hero.svg"

export default function FooterHero(){

    return(
        <div className={`w-full`}>
            <Image
                src={hero}
                alt="Hero"
                className={`w-full`}
            />
        </div>
    )

}