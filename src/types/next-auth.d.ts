import { Role } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import { DefaultUser } from "next-auth/jwt"
import { getToken } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: User
    }

    export interface User {
        id: string
        email: string
        password: string
        emailVerified?: Date
        image?: string
        firstName: string
        lastName?: string
        isActive: boolean
        role: Role
        sex?: string
    }

    interface Profile {
        family_name?: string
        given_name?: string
        picture?: string
        email_verified?: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        accessToken?: string
        role?: Role
    }
}
