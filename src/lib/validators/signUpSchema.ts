import * as z from "zod";

const SignUpSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Required." }) // Ensures the field is not empty
      .min(4, { message: "Too short." }) // Minimum length of 2 characters
      .max(100, { message: "Too long." }) // Maximum length of 100 characters
      .regex(/^[a-zA-Z\s]+$/, {
        message: "FullName can only contain letters and spaces",
      }), // Only allows letters ,
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .min(1, { message: "Required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must include at least one number." })
      .regex(/[!@#$%^&*()_\-+=?/|\\.,{}[\]~]/, {
        message:
          "Password must include at least one special character (e.g.@, #, $,).",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const OtpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type SignUpFormType = z.infer<typeof SignUpSchema>;

export type SignUpFormState = {
  success: boolean;
  message: string;
  errors: Record<keyof SignUpFormType, string> | undefined;
  fieldValues: SignUpFormType;
};

export default SignUpSchema;
