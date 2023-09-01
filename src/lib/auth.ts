import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
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

    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID as string,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
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
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Validate the credentials
                const user = users.find(user => user.username === credentials.username && user.password === credentials.password);
            
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return Promise.resolve(user);
                } else {
                    // If you return null or false then the credentials will be rejected
                    return Promise.resolve(null);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
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
                    return false;
                } else if (!existingUser.emailVerified) {
                    return '/unauthorized';
                }
                delete user.name;
            }
            //ToDo

            else if (account.provider === "credentials") {
                console.log("CredentialsProvider")
                if (!existingUser.isActive) {
                    // console.log("BanHammer")
                    return false;
                } else if (!existingUser.emailVerified) {
                    // console.log("Verify email")
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