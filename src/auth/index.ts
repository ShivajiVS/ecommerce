import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db";
import { SignInSchema } from "@/lib/validators";
import { accounts, users, verificationTokens } from "@/db/schema";

const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET!,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) return null;
        const { email } = validatedFields.data;

        return {
          email: email,
        };
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
