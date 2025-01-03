"use client";

import { LogIn, LogOut } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Logout = () => {
  const { isLoaded, user, isSignedIn } = useUser();

  const { signOut } = useClerk();

  if (!isLoaded) return;

  return (
    <>
      {isSignedIn ? (
        <div
          className="flex gap-2 font-medium"
          onClick={() => signOut({ redirectUrl: "/" })}
          data-testid="signOut"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
        </div>
      ) : (
        <Link
          href="/sign-in"
          className="flex gap-2 font-medium"
          data-testid="signIn"
        >
          <LogIn className="w-5 h-5" /> <span>SignIn</span>
        </Link>
      )}
    </>
  );
};

export default Logout;
