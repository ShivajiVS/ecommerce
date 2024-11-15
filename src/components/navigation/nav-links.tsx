import Link from "next/link";

import { DarkModeToggler } from "./dark-mode-toggler";
import Logout from "@/components/navigation/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileIcon from "../icons/profile";

export const NavLinks = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-7 w-7 cursor-pointer dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 mt-5 px-3 py-4 space-y-2">
        <DropdownMenuItem>
          <Link href="/account" className="font-medium">
            My Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/account" className="font-medium">
            Settings
          </Link>
        </DropdownMenuItem>

        <DarkModeToggler />
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
