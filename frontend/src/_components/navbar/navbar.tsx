import Image from "next/image";
import logo from "@assets/logo_mais_arte.svg"

export default function Navbar() {
  return (
    <nav className="px-4 py-2.5">
      <div className="m-auto justify-between w-11/12">
        <Image
          src={logo}
          alt="Logo"
          className="aspect-square h-full w-16"
        />
      </div>
    </nav>
  );
}
