/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";

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
import { useRouter } from "next/navigation";

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

export default function SignUpForm2() {
  const [formStep, setFormStep] = useState(0);
  const [pendingVerfication, setPendingVerification] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const nextFormStep = async () => {
    const isValid = await form.trigger(["fullName", "email"]);
    if (isValid) {
      form.clearErrors();
      setFormStep(1);
    }
  };

  const {
    formState: { isSubmitting },
  } = form;

  const { isLoaded, signUp, setActive } = useSignUp();

  const onSubmit = useCallback(async (values: z.infer<typeof SignUpSchema>) => {
    console.log("before signup");

    if (!isLoaded) return;

    console.log("before signup");

    const { fullName, email, password } = values;

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: fullName,
      });
      console.log("after signup");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("after prepare");

      setPendingVerification(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onVerifyEmailOtp = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors[0].message);
    }
  }, []);

  return (
    <div className="box-border py-12 lg:pt-16 px-2">
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
                <FormStep2 form={form} isSubmitting={isSubmitting} />
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
