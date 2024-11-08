"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PasswordInput } from "./password-input";
import { SignInSchema } from "@/lib/validators";
import AuthProviderWrapper from "./auth-provider-wrapper";
import { signInWithEmail } from "@/server/signInAction";
import { FormError } from "./form-error";

export default function SignInForm() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { execute, isExecuting, result } = useAction(signInWithEmail, {
    onSuccess(data) {
      if (data.data?.success === true) {
        router.refresh();
        redirect("/home");
      }
    },
    onError(error) {},
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    execute(values);
  };

  // result.validationErrors?.password

  result.data?.success === false;

  const {
    formState: {},
  } = form;

  return (
    <>
      <div className="box-border py-12 pt-20 lg:pt-10 px-2">
        <div className="mx-auto max-w-sm lg:max-w-md mb-2">
          {result.data?.success === false && (
            <FormError message={result?.data?.message} />
          )}
        </div>
        <Card className="mx-auto max-w-sm lg:max-w-md ">
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="vy@gmail.com" {...field} />
                          </FormControl>
                          <div className="h-1">
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
                  <Button
                    type="submit"
                    className="w-full capitalize flex items-center space-x-2"
                    disabled={isExecuting}
                  >
                    {isExecuting && (
                      <Loader2 className="h-5 w-5 animate-spin" />
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
            <AuthProviderWrapper />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                SignUp
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
