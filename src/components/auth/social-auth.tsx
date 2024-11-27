import { OAuthStrategy } from "@clerk/types";
import { useSignIn } from "@clerk/nextjs";

import SignInWithGoogle from "./signIn-with-google";

const SocialAuth = () => {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWith = async (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return (
    <form
      className="w-full space-y-2"
      onSubmit={(event) => {
        event.preventDefault();
        signInWith("oauth_google");
      }}
    >
      <SignInWithGoogle />
    </form>
  );
};

export default SocialAuth;
