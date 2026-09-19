import Image from "next/image";
import logo from "@assets/logo_mais_arte.svg"
import NavItem from "./navItem";
import AccountDropdown from "./account_dropdown";

export default function Navbar() {
  return (
    <nav className="px-4 py-2.5">
      <div className="m-auto justify-between items-center flex flex-row gap-16 w-11/12">
        <Image
          src={logo}
          alt="Logo"
          className="aspect-square h-full w-16"
        />
        <span className="gap-9 flex w-full">
          <NavItem texto="Eventos" link="/" />
          <NavItem texto="Artistas" link="/" />
          <NavItem texto="Espaços" link="/" />
        </span>

        <AccountDropdown imageUrl="https://picsum.photos/100/100" />

      </div>
    </nav>
  );
}
