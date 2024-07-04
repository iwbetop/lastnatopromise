import type { NextAuthConfig } from "next-auth";
import { GetUserByEMAIL } from "./lib/get";
import { signin } from "./lib/schema";

import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs"

export default {providers: [
    Credentials({
        async authorize(credentials){
            const validated = signin.safeParse(credentials);
            if(validated.success){
                const { email, password } = validated.data;
                const user = await GetUserByEMAIL(email);
                if(!user || !user.password || !user.email) return null;
                const matched = await bcryptjs.compare(
                    password, user.password
                );
                console.log("ismatched: ", matched)
                if(matched) return user;
            }
            return null;
        },
    }),
]} satisfies NextAuthConfig;