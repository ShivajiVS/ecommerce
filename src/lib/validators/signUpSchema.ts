import * as z from "zod";

const SignUpSchema = z
  .object({
    fullName: z.string().min(6, { message: "min 6 chars" }),
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
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default SignUpSchema;
