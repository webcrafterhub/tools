import bcrypt from "bcryptjs";
import NextAuth, { AuthError, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import { authFormSchema } from "./schemas/authForm";
import { findUserByEmail, findUserById, setEmailVerified } from "./actions/user";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Linkedin from "next-auth/providers/linkedin";
import { EMAIL_NOT_VERIFIED } from "./utils/contants";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"]; // To keep the default types
  }
  interface User {
    emailVerified: Date | null;
  }
}

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await setEmailVerified(user.id!);
    },
  },
  callbacks: {
    async signIn({ user, account, email }) {
      //allow signin iff email verified
      if (account?.provider === "credentials" && !user.emailVerified) {
        throw new Error(EMAIL_NOT_VERIFIED);
      }
      return true;
    },
    async jwt({ token, account }) {
      if (!token.sub) return token;

      const user = await findUserById(token.sub);
      if (!user) return token;
      token.role = user.role;
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub || "";
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Linkedin({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      authorize: async (credentials) => {
        let user = null;
        const validateFields = authFormSchema.safeParse(credentials);
        if (!validateFields.success) {
          throw new Error("Invalid input data");
        }
        const { email, password } = validateFields.data;

        user = await findUserByEmail(email);

        if (!user || !user.password) {
          throw new Error("User email or password is incorrect");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("User email or password is incorrect");
        }
        return user;
      },
    }),
  ],
});
