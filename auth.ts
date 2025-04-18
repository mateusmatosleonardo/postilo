import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.userId = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
} as NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

interface ProviderWithId {
  id: string;
  name: string;
}

export const providerMap = authOptions.providers.map((provider) => {
  const typedProvider = provider as unknown as ProviderWithId;
  return {
    id: typedProvider.id,
    name: typedProvider.name,
  };
});
