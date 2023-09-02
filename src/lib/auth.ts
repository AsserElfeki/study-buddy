import  sendVerificationEmail  from '@lib/sendVerificationEmail';
import { prisma } from "@lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { Role } from '@prisma/client';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 // 1 day
    },

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            type: "credentials",


            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {},
            async authorize(credentials) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                //console.log("====CREDENTIALS===")
                //console.log(credentials)
                // const { email, password } = credentials as {
                //     email: String,
                //     password: String
                // }
                console.log("auth func fired")
                const res = await fetch(process.env.NEXTAUTH_URL + "/api/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });
                console.log("back at AUTH fuin")
                const result = await res.json();
                console.log(result)
                const user = result.data;

                // If no error and we have user data, return it

                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.SMTP_FROM,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    pages: {
        //TODO: Custom pages for errors/signOut
        signIn: "/auth/login",
        //error: "/api/error"
        //signOut: "/api/signout"
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },

        async signIn({ user, account, profile }) {
            console.log("the signin in Auth fired")
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
            } else if (account.provider === "email") {
                console.log("EmailProvider")
                if (!existingUser) {
                    user.firstName = "Guest";
                }
                else if (!existingUser.isActive) {
                    console.log("BanHammer")
                    return false;
                }
            } else if (account.provider === "credentials") {
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
            session.user.id = token.id;
            session.user.name = token.name;
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
