import Link from "next/link";

import { NavLinks } from "@/components/navigation/nav-links";
import { AddToBagIcon } from "../icons";
import BagCount from "@/components/bag/bag-count";
import { Header } from "./nav-wrapper";

const NavBar = () => {
  return (
    <Header>
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
    </Header>
  );
};

export default NavBar;
