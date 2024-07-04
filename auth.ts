import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { GetUserByID } from "./lib/get";
import { JWT } from "next-auth/jwt"
import authConfig from "./auth.config";
import prisma from "./lib/db";

export type ExtendedUser = DefaultSession["user"] & {
    role: "ADMIN" | "USER" | "SUPERADMIN",
    onboardingStatus: true | false
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER" | "SUPERADMIN",
        onboardingStatus: true | false
    }
}

export const {
    auth, signIn, signOut, handlers, unstable_update
} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    callbacks: {
        async session({token, session, user}){
            if(!token.sub || !token) return session;
            session.user.role = token.role as "ADMIN" | "SUPERADMIN" | "USER";
            if(session.user && token.sub){
                session.user.id = token.sub;
            }
            if(token.role && session.user.role){
                session.user.role = token.role
            }
            session.user.onboardingStatus = token.onboardingStatus;
            return session;
        },
        async jwt({token, trigger, session}){
            if(!token.sub) return token;
            const exist = await GetUserByID(token.sub);
            if(!exist) return token;
            token.role = exist.role.name;
            token.onboardingStatus = exist.onboardingStatus
            if (trigger === "update" && session) {
                token = {...token, user : session}
                return token;
              };
            return token;
        },
    }
});