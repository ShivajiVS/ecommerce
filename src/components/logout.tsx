"use client";

import { LogOut } from "lucide-react";

const Logout = () => {
  const logout = () => {
    console.log("logout...");
  };
  return (
    <div className="flex gap-2 font-medium" onClick={logout}>
      <LogOut className="w-5 h-5" />
      Logout
    </div>
  );
};

export default Logout;
