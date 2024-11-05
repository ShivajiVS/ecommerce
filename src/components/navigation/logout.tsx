"use client";

import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

import { signOut } from "next-auth/react";
import { useClientSession } from "@/auth/useClientSession";
import { logout } from "@/auth/logout";

const Logout = () => {
  const session = useClientSession();

  return (
    <>
      {session ? (
        <div className="flex gap-2 font-medium" onClick={() => signOut()}>
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      ) : (
        <Link href="/sign-in" className="flex gap-2 font-medium">
          <LogIn className="w-5 h-5" /> <span>SignIn</span>
        </Link>
      )}
    </>
  );
};

export default Logout;
