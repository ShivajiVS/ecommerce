/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PasswordInput } from "./password-input";
import { SignUpSchema } from "@/lib/validators";
import { MotionDiv } from "../framer-motion";
import { OtpSchema } from "@/lib/validators/signUpSchema";
import { FormError } from "./form-error";
import SocialAuth from "./social-auth";

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
  const [formStep, setFormStep] = useState<number>(0);
  const [pendingVerfication, setPendingVerification] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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

  const otpForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
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

  const {
    formState: { isSubmitting: otpIsSubmitting },
  } = otpForm;

  const { isLoaded, signUp, setActive } = useSignUp();

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

  const onVerifyEmailOtp = useCallback(
    async ({ pin }: z.infer<typeof OtpSchema>) => {
      if (!isLoaded) return;

      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: pin,
        });

        if (completeSignUp.status !== "complete") {
          console.log(JSON.stringify(completeSignUp, null, 2));
        }

        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          toast("Verified Successful", {
            duration: 500,
          });
          router.push("/");
        }
      } catch (error: any) {
        // console.error(JSON.stringify(error, null, 2));
        setError(error.errors[0].message);
      }
    },
    []
  );

  return (
    <div className="box-border py-12 pt-32 lg:pt-12 px-2.5">
      {error && (
        <div className="mx-auto max-w-sm lg:max-w-md mb-4">
          <FormError message={error} />
        </div>
      )}

      {!pendingVerfication ? (
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
      ) : (
        <Card className="mx-auto max-w-sm lg:max-w-md py-6 px-4 flex flex-col justify-center space-y-4  ">
          <div className="w-full flex flex-col items-center space-y-2 mt-4">
            <Mail className="h-12 w-12 text-primary text-center font-bold" />
            <h2 className="text-xl font-bold tracking-tight">
              Please check your email
            </h2>
            <h4 className="text-sm">
              we've sent a Otp code to {getValues("email")}
            </h4>
          </div>

          <CardContent>
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(onVerifyEmailOtp)}
                className="space-y-8 mt-2"
              >
                <div className="flex w-full justify-center">
                  <FormField
                    control={otpForm.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between w-full mt-4 space-x-8 ">
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={otpIsSubmitting}
                  >
                    {otpIsSubmitting ? "Verifiying" : "Verify"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
