import { Role } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"
import { JWT, DefaultUser } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: User
    }

    export interface User {
        id: string
        email: string
        password: string
        emailVerified?: Date
        firstName: string
        lastName?: string
        image?: string
        id: string
        sex?: string
        role?: Role
        isActive: boolean
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
