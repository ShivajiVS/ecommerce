import Link from "next/link";
import { NavLinks } from "@/components/navigation/navLinks";
import { AddToBagIcon } from "../icons";
import BagCount from "@/components/bag/bagCount";

const NavBar = () => {
  return (
    <header className="w-full h-14 sticky top-0 bg-gray-50 dark:bg-zinc-800 drop-shadow z-50">
      <nav className="max-w-6xl h-full flex mx-auto justify-between items-center px-6">
        <Link
          href="/"
          className="font-bold tracking-tight text-lg dark:text-white"
        >
          Shivaji.dev
        </Link>
        <div className="flex space-x-6">
          <div className="relative">
            <Link href="/bag">
              <AddToBagIcon />
              <BagCount />
            </Link>
          </div>
          <NavLinks />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
