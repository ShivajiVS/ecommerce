"use client";

import { LogIn, LogOut } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Logout = () => {
  const { isLoaded, user } = useUser();

  const { signOut } = useClerk();

  if (!isLoaded) return null;

  console.log("user info", user?.getSessions);

  console.log(user?.getSessions);

  return (
    <>
      {user ? (
        <div
          className="flex gap-2 font-medium"
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          <LogOut className="w-5 h-5" />
          <span>Sign out</span>
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
