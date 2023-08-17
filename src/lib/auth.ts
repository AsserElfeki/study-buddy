//here is the nextAuth option, separate from the handler because sometimes there exporting errors when it's coupled

import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

//this is the object that contains config for authentication process
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
            /**
             * Asynchronously authorizes the user with the given credentials.
             *
             * @param {Object} credentials - The user's credentials.
             * @param {string} credentials.email - The user's email.
             * @param {string} credentials.password - The user's password.
             * @return {Object | null} - Returns an object with user data if authorization is successful, otherwise null.
             */
            //
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.upsert({
                    where: {
                        email: credentials.email,
                    },
                    update: {
                        email: credentials.email,
                        name: credentials.name,
                        googleId: credentials.googleId,
                        githubId: credentials.githubId,
                    },
                    create: {
                        email: credentials.email,
                        name: credentials.name,
                        googleId: credentials.googleId,
                        githubId: credentials.githubId,
                    },
                });

                if (!user || !(await compare(credentials.password, user.password))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    googleId: user.googleId,
                    githubId: user.githubId,
                };
            },
        }),
    ],
    callbacks: {
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