/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, token }: { session: any; token: any }) {
      if (token.sub) session.user.userId = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

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
