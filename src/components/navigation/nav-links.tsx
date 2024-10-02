import Link from "next/link";

import ProfileIcon  from "@/components/icons/profile";
import { DarkModeToggler } from "./dark-mode-toggler";
import Logout from "@/components/navigation/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavLinks = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ProfileIcon />
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
