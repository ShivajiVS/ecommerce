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
import GoogleSignInButton from "./google-signIn";
import { PasswordInput } from "./password-input";
import { SignUpSchema } from "@/lib/validators";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  let {
    getValues,
    formState: { isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    console.log("submitted..", values);
  };

  return (
    <div className="box-border  py-5 md:pt-3">
      <Card className="mx-auto max-w-sm lg:max-w-md">
        <div className="flex flex-col items-center">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Create an Account
            </CardTitle>
            {/* <CardDescription>Sign up to create a new account</CardDescription> */}
          </CardHeader>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md lg:max-w-lg flex flex-col gap-4"
          >
            <CardContent>
              <div className="grid gap-4">
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
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    Create Account
                  </Button>
                  <div className="text-sm font-normal mx-1 mt-2">
                    <p>
                      By clicking this you agree to our{" "}
                      <span className="text-blue-600">Terms & Conditions</span>{" "}
                      & <span className="text-blue-600">Privacy policy</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="mx-auto my-1 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                    or
                  </div>
                  <GoogleSignInButton provider="google">Continue with Google</GoogleSignInButton>
                </div>
                <div className="text-center text-sm">
                  Do have an account?{" "}
                  <Link href="/sign-in" className="underline">
                    Sign in
                  </Link>
                </div>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
