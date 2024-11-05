"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import GoogleSignInButton from "./signIn-with-google";
import { PasswordInput } from "./password-input";
import { SignUpSchema } from "@/lib/validators";
import AuthProviderWrapper from "./auth-provider-wrapper";
import { cn } from "@/lib/utils";
import { MotionDiv } from "../framer-motion";
import { useState } from "react";
import { ArrowLeft, CircleArrowLeft } from "lucide-react";

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

  let {
    getValues,
    formState: { isSubmitting, isDirty, isValid },
  } = form;

  const nextFormStep = () => {
    form.trigger(["fullName", "email"]);

    const fullNameState = form.getFieldState("fullName");
    const emailState = form.getFieldState("email");

    if (!fullNameState.isDirty || fullNameState.invalid) return;
    if (!emailState.isDirty || emailState.invalid) return;

    setFormStep(1);
  };

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    console.log("submitted..", values);
  };

  return (
    <div className="box-border py-5 md:pt-3">
      <Card className="mx-auto max-w-sm lg:max-w-md">
        <div className="flex flex-col ">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Create an Account
            </CardTitle>
            {formStep === 1 && (
              <CardDescription className="flex space-x-0.5">
                <ArrowLeft
                  className="cursor-pointer"
                  onClick={() => {
                    setFormStep(0);
                  }}
                />
              </CardDescription>
            )}
          </CardHeader>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md lg:max-w-lg flex flex-col gap-4 relative overflow-x-hidden"
          >
            <CardContent>
              <div className="grid gap-4">
                <MotionDiv
                  className={cn("space-y-4", { hidden: formStep == 1 })}
                  animate={{ translateX: `-${formStep * 100}%` }}
                  transition={{ ease: "easeInOut" }}
                >
                  <div className="grid gap-2">
                    {/* full name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Kondeti Shivaji" {...field} />
                          </FormControl>
                          <div className="h-1 ">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    {/* email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="vy@gmail.com" {...field} />
                          </FormControl>
                          <div className="h-1 ">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </MotionDiv>

                <MotionDiv
                  className={cn("space-y-4", {
                    hidden: formStep == 0,
                  })}
                  //formstep == 0 ->translateX == 100%
                  //formstep == 1 ->translateX == 0%

                  animate={{ translateX: `-${100 - formStep * 100}%` }}
                  transition={{ ease: "easeInOut" }}
                >
                  <div className="grid gap-2">
                    {/* password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="flex w-full">
                              <PasswordInput
                                placeholder="*************"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <div className="h-1">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    {/* confirm password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="flex w-full">
                              <PasswordInput
                                placeholder="*************"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <div className="h-1">
                            <FormMessage className="text-xs" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </MotionDiv>

                {/* submit button */}
                <div>
                  {/*  */}
                  <div className="mt-2 flex space-x-6 justify-around">
                    {formStep == 0 && (
                      <Button className="w-full" onClick={nextFormStep}>
                        Next
                      </Button>
                    )}

                    {formStep == 1 && (
                      <Button
                        type="submit"
                        className="w-full mb-0.5"
                        disabled={isSubmitting}
                      >
                        Create Account
                      </Button>
                    )}
                  </div>
                  {/*  */}

                  <div className="text-sm font-normal mx-1 mt-2">
                    <p>
                      By clicking this you agree to our{" "}
                      <span className="text-blue-600">Terms & Conditions</span>{" "}
                      & <span className="text-blue-600">Privacy policy</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </form>

          <CardFooter className="flex-col">
            <div className="mx-auto mb-3 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
              or
            </div>
            <AuthProviderWrapper />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
