import { Mail, Router } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpSchema } from "@/lib/validators/signUpSchema";
import { useCallback, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormError } from "./form-error";

type Props = {
  email: string;
};

export const OtpVerfication = ({ email }: Props) => {
  const [error, setError] = useState<string>("");

  const otpForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const {
    formState: { isSubmitting: otpIsSubmitting },
  } = otpForm;

  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

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
        setError(error.errors[0].message);
      }
    },
    []
  );

  return (
    <div className="pt-16 px-2.5">
      {error && (
        <div className="mx-auto max-w-sm lg:max-w-md mb-4">
          <FormError message={error} />
        </div>
      )}
      <Card className="mx-auto max-w-sm lg:max-w-md py-6 px-4 flex flex-col justify-center space-y-4  ">
        <div className="w-full flex flex-col items-center space-y-2 mt-4">
          <Mail className="h-12 w-12 text-primary text-center font-bold" />
          <h2 className="text-xl font-bold tracking-tight">
            Please check your email
          </h2>
          <h4 className="text-sm">we've sent a Otp code to {email}</h4>
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
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => console.log("hello")}
                >
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
    </div>
  );
};
