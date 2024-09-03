import { useState, forwardRef } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { CustomePasswordInput } from "./customePasswordInput";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
      <CustomePasswordInput
        type={showPassword ? "text" : "password"}
        className="w-full"
        ref={ref}
        {...props}
        suffix={
          showPassword ? (
            <EyeIcon
              className="select-none w-5 h-5"
              onClick={() => setShowPassword((PrevState) => !PrevState)}
            />
          ) : (
            <EyeOffIcon
              className="select-none w-5 h-5 "
              onClick={() => setShowPassword((PrevState) => !PrevState)}
            />
          )
        }
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
