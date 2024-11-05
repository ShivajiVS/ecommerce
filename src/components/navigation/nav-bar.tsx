import Link from "next/link";
import localFont from "next/font/local";

import { Header } from "./nav-wrapper";
import { NavLinks } from "@/components/navigation/nav-links";
import BagCount from "@/components/bag/bag-count";
import BagIcon from "@/components/icons/bag-icon";

const redressed = localFont({
  src: "../../fonts/Redressed-Regular.ttf",
  weight: "400",
});

const NavBar = () => {
  return (
    <Header>
      <nav className="max-w-6xl h-full flex mx-auto justify-between items-center px-4">
        <Link
          href="/"
          className={`font-bold tracking-tight text-2xl dark:text-white ${redressed.className}`}
        >
          <span className="text-blue-500">S</span>vella
        </Link>
        <div className="flex space-x-6">
          <div className="relative">
            <Link href="/bag">
              <BagIcon />
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
