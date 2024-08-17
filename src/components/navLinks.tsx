import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileIcon } from "./icons";
import Link from "next/link";
import { DarkModeToggler } from "./darkModeToggler";
import Logout from "./logout";

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
