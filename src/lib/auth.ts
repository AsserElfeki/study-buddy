//here is the nextAuth option, separate from the handler because sometimes there exporting errors when it's coupled

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

//this is the object that contains config for authentication process
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    pages: {
        signIn: "/login"
    },

    session: {
        strategy: "jwt",
    },

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string ?? "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user || !(await compare(credentials.password, user.password))) {
                    return null;
                }

                return {
                    //ToDO : change what I need to get back
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    randomKey: "Hey cool", //anything can be added 
                };
            },
        }),
    ],
    callbacks: {

        async signIn({ account, profile }): Promise<string | boolean> {
            // perform sign in logic here
            if (account?.provider === "google" || account?.provider === "github") {
                if (profile?.email) {
                    await prisma.user.upsert({
                        where: { email: profile.email },
                        update: { email: profile.email, name: profile.name, provider: account.provider },
                        create: { email: profile.email, name: profile.name, provider: account.provider },
                    });
                    return true;
                } else {
                    return false;
                }
            }

            // return a string or boolean value indicating success or failure
            return Promise.resolve(true);
        },

        /**
         * Updates the session object with the provided token information.
         * here any more stuff can be added to the session
         * @param {object} session - The current session object.
         * @param {object} token - The token information to update the session with.
         * @return {object} The updated session object with the user information updated.
        */
        session: ({ session, token }) => {
            // console.log("Session Callback", { session, token });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        //here any info can be added to the jwt token 
        jwt: ({ token, user }) => {
            // console.log("JWT Callback", { token, user });
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
};