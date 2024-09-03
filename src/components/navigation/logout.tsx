"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";

const Logout = () => {
  let userStatus = false;
  const logout = () => {
    console.log("logout...");
  };
  return (
    <>
      {userStatus ? (
        <div className="flex gap-2 font-medium" onClick={logout}>
          <LogOut className="w-5 h-5" />
          Logout
        </div>
      ) : (
        <Link href="/sign-in" className="flex gap-2 font-medium">
          Sign-In
        </Link>
      )}
    </>
  );
};

export default Logout;
