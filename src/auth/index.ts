import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

// import { db } from "./db"
import { SignInSchema } from "@/lib/validators";
// import { users } from "./schema";

const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET!,
  // adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "enter you email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter you password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // const user = await db.query.users.findFirst({
          //   where: eq(users.email, email),
          // });
          // if (!user || !user.password) return null;

          // const passwordMatch = await bcrypt.compare(password, user.password);
          // if (passwordMatch) return user;
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
