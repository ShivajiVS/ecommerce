// import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

const GoogleSignInButton = ({
  children,
  provider,
}: {
  children: React.ReactNode;
  provider: string;
}) => {
  return (
    <form
      className="w-full"
      // action={async () => {
      //   "use server";
      //   await signIn("google");
      // }}
    >
      <Button
        variant="outline"
        type="submit"
        value={provider}
        name="provider"
        className="w-full flex items-center space-x-2"
      >
        <GithubIcon className="w-5 h-5" />
        <span>{children}</span>
      </Button>
    </form>
  );
};

export default GoogleSignInButton;
