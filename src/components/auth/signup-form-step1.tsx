import * as z from "zod";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignUpSchema } from "@/lib/validators";
import { MotionDiv } from "../framer-motion";

interface FormStep1Props {
  form: UseFormReturn<z.infer<typeof SignUpSchema>>;
  onNextStep: () => void;
}

export function SignupFormStep1({ form, onNextStep }: FormStep1Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNextStep();
    }
  };
  return (
    <MotionDiv
      className="space-y-4"
      animate={{ translateX: "0%" }}
      transition={{ ease: "easeInOut" }}
      onKeyDown={handleKeyDown}
    >
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Kondeti Shivaji"
                {...field}
                data-testid="fullName"
              />
            </FormControl>
            <FormMessage
              className="text-xs"
              data-testid="fullNameErrorMessage"
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="yourname@example.com"
                data-testid="email"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" data-testid="emailErrorMessage" />
          </FormItem>
        )}
      />
      <Button className="w-full" onClick={onNextStep}>
        Next
      </Button>
    </MotionDiv>
  );
}
