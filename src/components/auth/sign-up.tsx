/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { useSignUp } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SignUpSchema } from "@/lib/validators";
import { FormError } from "./form-error";
import SocialAuth from "./social-auth";
import { SignupFormStep1 } from "./signup-form-step1";
import { SignupFormStep2 } from "./signup-form-step2";
import { OtpVerfication } from "./otp-verification";

export default function SignUpForm() {
  const [formStep, setFormStep] = useState<number>(0);
  const [pendingVerfication, setPendingVerification] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const nextFormStep = useCallback(async () => {
    const isValid = await form.trigger(["fullName", "email"]);
    if (isValid) {
      form.clearErrors();
      setFormStep(1);
    }
  }, []);

  const {
    formState: { isSubmitting },
    getValues,
  } = form;

  const { isLoaded, signUp } = useSignUp();

  const onSubmit = useCallback(
    async ({ fullName, email, password }: z.infer<typeof SignUpSchema>) => {
      if (!isLoaded) return;

      try {
        await signUp.create({
          emailAddress: email,
          password,
          firstName: fullName,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setPendingVerification(true);
        setError("");
      } catch (error: any) {
        setError(error.errors[0].message);
      }
    },
    []
  );

  if (pendingVerfication) {
    return <OtpVerfication email={getValues("email")} />;
  }

  return (
    <div className="box-border pt-10 px-2.5">
      {error && (
        <div className="mx-auto max-w-sm lg:max-w-md mb-4">
          <FormError message={error} />
        </div>
      )}

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
                <SignupFormStep1 form={form} onNextStep={nextFormStep} />
              )}
              {formStep === 1 && (
                <SignupFormStep2 form={form} isSubmitting={isSubmitting} />
              )}
            </CardContent>
          </form>
          <CardFooter className="flex-col">
            <div className="mx-auto mb-3 flex w-full items-center justify-evenly before:mr-4 before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:h-px after:flex-grow after:bg-stone-400">
              or
            </div>
            <SocialAuth />
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
