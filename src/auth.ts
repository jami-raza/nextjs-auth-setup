import NextAuth, { AuthError } from "next-auth";
import "next-auth/jwt";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/db/prismaClient";
import { userGoogleLogin } from "@/actions";

const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  // pages: { signIn: "login" },
  providers: [
    Google({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response: "code",
        },
      },
    }),
  ],

  basePath: "/auth",
  callbacks: {
    async signIn({account, email, user, profile}){
      console.log(account, email, user, "AUTH SING IN ============>")
      if(account?.provider === "google" && profile && profile.email){
        await userGoogleLogin({name: profile.name, email: profile.email})

      }
      return true
    },
    // async signOut(){
    //   return true
    // },
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") {
        console.log(auth, "AUTH request user");
        return !!auth;
      }
      return true;
    },
    jwt({ token, trigger, session, account }) {
      console.log(token, trigger, session, account, "CHECK GOOGLE LOGIN");

      if (trigger === "update") token.name = session.user.name;

      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      console.log(session, token, "Sessions ========>");

      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      // await userGoogleLogin({name: session.user.name, email: session.user.email})
      return session;
    },
  },

  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
