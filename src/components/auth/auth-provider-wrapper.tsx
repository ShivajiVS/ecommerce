import React from "react";
import SignInWithGoogle from "./signIn-with-google";
import { signInWithProvider } from "@/server/signInWithProvider";

const AuthProviderWrapper = () => {
  return (
    <form className="w-full space-y-2" action={signInWithProvider}>
      <SignInWithGoogle provider="google">
        continue with google
      </SignInWithGoogle>
    </form>
  );
};

export default AuthProviderWrapper;
