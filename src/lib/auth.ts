import sendVerificationEmail from '@lib/sendVerificationEmail';
import { prisma } from "@lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 300 // 300 days
    },

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            type: "credentials",

            credentials: {},
            async authorize(credentials) {
                const res = await fetch(process.env.NEXTAUTH_URL + "/api/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });
                const result = await res.json();
                const user = result.data;

                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        //TODO: Custom pages for errors/signOut
        signIn: "/login",
        //error: "/api/error"
        //signOut: "/api/signout"
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email }
            })
            if (account?.provider === "google") {
                user.firstName = profile.given_name;
                user.lastName = profile.family_name;
                user.image = profile.picture;

                if (!existingUser) { //ToDO
                    await sendVerificationEmail(user as User)
                }
                else if (!existingUser.isActive) {
                    return false;
                } else if (!existingUser.emailVerified) {
                    await sendVerificationEmail(user as User)
                    return '/unauthorized';
                }

                delete user.name;
                
            } else if (account.provider === "credentials") {
                console.log("CredentialsProvider")
                if (!existingUser.isActive) {
                    console.log("BanHammer")
                    return false;
                } else if (!existingUser.emailVerified) {
                    console.log("Verify email")
                    await sendVerificationEmail(user as User)
                    // return '/unauthorized';
                }
            }
            return true;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.firstName = token.firstName as string;
            session.user.lastName = token.lastName as string;
            session.user.role = token.role;
            session.user.image = token.picture
            session.user.isActive = token.isActive as boolean
            // session.user = token
            return session;
        },
        jwt: async ({ profile, account, user, token, trigger, session }) => {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.name = user.firstName + " " + (user.lastName ? user.lastName : "");
                token.role = user.role;
                token.isActive = user.isActive;
            }

            if (trigger === "update") {
                if (session?.firstName && session?.lastName)
                    token.name = session.firstName + " " + session.lastName;
                else if (session?.image)
                    token.picture = session.image
            }

            return token;
        },
    },
};
