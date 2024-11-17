"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "./password-input";
import { SignUpSchema } from "@/lib/validators";
import AuthProviderWrapper from "./auth-provider-wrapper";
import { MotionDiv } from "../framer-motion";
import { createUser } from "@/server/createUserAction";

interface FormStep1Props {
  form: UseFormReturn<z.infer<typeof SignUpSchema>>;
  onNextStep: () => void;
}

interface FormStep2Props {
  form: UseFormReturn<z.infer<typeof SignUpSchema>>;
  isSubmitting: boolean;
}

function FormStep1({ form, onNextStep }: FormStep1Props) {
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
              <Input placeholder="Kondeti Shivaji" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
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
              <Input placeholder="yourname@example.com" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <Button className="w-full" onClick={onNextStep}>
        Next
      </Button>
    </MotionDiv>
  );
}

function FormStep2({ form, isSubmitting }: FormStep2Props) {
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

export default function SignUpForm() {
  const [formStep, setFormStep] = useState(0);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const [state, formAction] = useActionState(createUser, {
  //   success: false,
  //   message: "",
  //   errors: undefined,
  //   fieldValues: {
  //     fullName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  // });

  const nextFormStep = async () => {
    const isValid = await form.trigger(["fullName", "email"]);
    if (isValid) {
      form.clearErrors();
      setFormStep(1);
    }
  };

  const { execute, status, result, isExecuting } = useAction(createUser, {
    onSuccess(data) {
      form.reset();
      // Redirect to sign-in page after successful registration
      redirect("/sign-in");
    },
    onError(error) {
      console.log("errorrr", error.error);
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    execute(values);
  };

  return (
    <div className="box-border py-12 pt-24 lg:pt-16 px-2">
      <Card className="mx-auto max-w-sm lg:max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Create an Account
          </CardTitle>
          {formStep === 1 && (
            <CardDescription className="flex space-x-0.5">
              <ArrowLeft
                aria-label="Go back to the previous step"
                className="cursor-pointer"
                onClick={() => setFormStep(0)}
              />
            </CardDescription>
          )}
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md lg:max-w-lg flex flex-col gap-4"
          >
            <CardContent>
              {formStep === 0 && (
                <FormStep1 form={form} onNextStep={nextFormStep} />
              )}
              {formStep === 1 && (
                <FormStep2 form={form} isSubmitting={isExecuting} />
              )}
            </CardContent>
          </form>
          <CardFooter className="flex-col">
            <div className="mx-auto mb-3 flex w-full items-center justify-evenly before:mr-4 before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:h-px after:flex-grow after:bg-stone-400">
              or
            </div>
            <AuthProviderWrapper />
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link href="/sign-in" className="underline ml-1">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
