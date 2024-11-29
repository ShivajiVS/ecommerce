import * as z from "zod";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "./password-input";
import { SignUpSchema } from "@/lib/validators";
import { MotionDiv } from "../framer-motion";

interface FormStep2Props {
  form: UseFormReturn<z.infer<typeof SignUpSchema>>;
  isSubmitting: boolean;
}

export function SignupFormStep2({ form, isSubmitting }: FormStep2Props) {
  return (
    <MotionDiv
      className="space-y-4"
      animate={{ translateX: "0%" }}
      transition={{ ease: "easeInOut" }}
    >
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <PasswordInput placeholder="*************" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <PasswordInput placeholder="*************" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating" : "Create Account"}
      </Button>
    </MotionDiv>
  );
}
