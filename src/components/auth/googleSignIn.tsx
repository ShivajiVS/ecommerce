import React from "react";
import { Button } from "@/components/ui/button";

const GoogleSignInButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button variant="outline" type="button" className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
