/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string | undefined;
    } & DefaultSession["user"];
  }
}
