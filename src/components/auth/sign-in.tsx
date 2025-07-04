/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

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
import { SignInSchema } from "@/lib/validators";
import { FormError } from "./form-error";
import SocialAuth from "./social-auth";

export default function SignInForm() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isLoaded, signIn, setActive } = useSignIn();

  const onSubmit = useCallback(async (values: z.infer<typeof SignInSchema>) => {
    const { email, password } = values;

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      }
    } catch (error: any) {
      console.log("auth error is sss", error.errors[0].message);
      setError(error.errors[0].message);
    }
  }, []);

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="box-border pt-8 px-2.5">
        <div className="mx-auto max-w-sm lg:max-w-md mb-4">
          {error && <FormError message={error} />}
        </div>
        <Card className="mx-auto max-w-sm lg:max-w-md relative">
          <div>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-md flex flex-col gap-4"
              >
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      {/* email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                          const { ref, ...restField } = field;
                          useImperativeHandle(ref, () => emailRef.current!);
                          return (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="vy@gmail.com"
                                  data-testid="email"
                                  {...restField}
                                  ref={emailRef}
                                />
                              </FormControl>
                              <div className="h-1">
                                <FormMessage
                                  className="text-xs"
                                  data-testid="emailErrorMessage"
                                />
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      {/* password */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center">
                              <FormLabel>Password</FormLabel>
                              <Link
                                href="#"
                                className="ml-auto inline-block text-sm underline text-[#0069c2]"
                              >
                                Forgot your password?
                              </Link>
                            </div>
                            <FormControl>
                              <div className="flex w-full">
                                <PasswordInput
                                  placeholder="*************"
                                  data-testid="password"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <div className="h-1">
                              <FormMessage
                                className="text-xs"
                                data-testid="passwordErrorMessage"
                              />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full capitalize flex items-center space-x-2"
                      data-testid="sign-in"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <Loader2
                          className="h-5 w-5 animate-spin"
                          data-testid="loadingSpinner"
                        />
                      )}{" "}
                      <span>Login</span>
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Form>
            <CardFooter className="flex-col">
              <div className="mx-auto mb-3 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                or
              </div>
              <SocialAuth />
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline">
                  SignUp
                </Link>
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>
    </>
  );
}
