import React from "react";
import SignInWithGoogle from "./signIn-with-google";
import { signInWithProviderAction } from "@/server/signInAction";

const AuthProviderWrapper = () => {
  return (
    <form className="w-full space-y-2" action={signInWithProviderAction}>
      <SignInWithGoogle provider="google">
        continue with google
      </SignInWithGoogle>
    </form>
  );
};

export default AuthProviderWrapper;
