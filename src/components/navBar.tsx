import { AddToBagIcon } from "@/components/icons";

import { NavLinks } from "@/components/navLinks";

const NavBar = () => {
  return (
    <header className="w-full h-14 sticky top-0 bg-gray-50 dark:bg-zinc-800 drop-shadow z-50">
      <nav className="max-w-6xl h-full flex mx-auto justify-between items-center px-6">
        <div className="font-bold tracking-tight text-lg dark:text-white">
          Shivaji.dev
        </div>
        <div className="flex space-x-6">
          <AddToBagIcon />
          <NavLinks />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
