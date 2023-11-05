import { PrismaClient } from '@prisma/client' //client that interacts with the db

// PrismaClient is attached to the `global` object in development to prevent exhausting your database connection limit.
// The reason is that, with Next.js's hot-reloading feature, a new instance of PrismaClient would be created every time you save a file, which could lead to hitting the database connection limit. By attaching the Prisma client to the global object, you ensure that only one instance is created and reused across hot reloads.

// Learn more:
// https://pris.ly/d/help/next-js-best-practices

//casts the global object to have a type that includes the prisma property. This makes TypeScript aware that a prisma property might exist on the global object.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// /This line checks if there's already an instance of PrismaClient on the global object. If there is, it reuses that instance. If not, it creates a new instance with the logging option set to log queries.
export const prisma = globalForPrisma.prisma || new PrismaClient({
    log: ["warn", "error"],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma