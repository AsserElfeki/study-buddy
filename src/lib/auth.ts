import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import { Role } from '@prisma/client';

export const authOptions: NextAuthOptions = {
    // This is a temporary fix for prisma client.
    // @see https://github.com/prisma/prisma/issues/16117
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login",
        
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 // 1 day
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        CredentialsProvider({
            name: "Sign in",
            credentials: {},
            async authorize(credentials) {
                const res = await fetch(process.env.NEXTAUTH_URL + "/api/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });
                const result = await res.json();
                const user = result.user;

                // If no error and we have user data, return it

                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user , account, profile }) {
            const existingUser = await prisma.user.findUnique({
                where: { id: user.id }
            })
            if (account?.provider === "google") {
                user.firstName = profile.given_name;
                user.lastName = profile.family_name;
                user.image = profile.picture;
                if (!existingUser) {
                    await sendVerificationEmail(user)
                }
                else if (!existingUser.isActive) {
                    console.log("BanHammer")
                    return false;
                } else if (!existingUser.emailVerified) {
                    console.log("Verify email")
                    return '/unauthorized';
                }

                delete user.name;
            }
            //ToDo
            
            else if (account.provider === "credentials") {
                console.log("CredentialsProvider")
                if (!existingUser.isActive) {
                    console.log("BanHammer")
                    return false;
                } else if (!existingUser.emailVerified) {
                    console.log("Verify email")
                    return '/unauthorized';
                }
            }
            return true;
        },
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.role = token.role as Role;
                session.user.image = token.picture as string;
                session.user.isActive = token.isActive as boolean;
            }
            return session;
        },
        jwt: async ({ profile, account, user, token, trigger, session }) => {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
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