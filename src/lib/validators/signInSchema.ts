import * as z from "zod";

const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
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
});

type SignInFormType = z.infer<typeof SignInSchema>;

export type SignInFormState = {
  success: boolean;
  message: string;
  errors: Record<keyof SignInFormType, string> | undefined;
  fieldValues: SignInFormType;
};

export default SignInSchema;
