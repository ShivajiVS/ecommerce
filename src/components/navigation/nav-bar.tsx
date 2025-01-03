import Link from "next/link";
import localFont from "next/font/local";

import { Header } from "./nav-wrapper";
import { NavLinks } from "@/components/navigation/nav-links";
import BagCount from "@/components/bag/bag-count";

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
          <span className="text-primary">Sv</span>ella
        </Link>
        <div className="flex space-x-6">
          <div className="relative">
            <Link href="/bag" data-testid="bag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7 cursor-pointer dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
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
