import { PrismaClient } from "@prisma/client";
import { hashPassword } from '../src/lib/hashPasswords';
// import { hash } from "bcryptjs";
import cuid from 'cuid';

const prisma = new PrismaClient();

/**
 * Executes the main function.
 *
 * @return {Promise<void>} A promise that resolves when the function has finished executing.
 */
async function main(): Promise<void> {
    const user = await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            email: "admin@admin.com",
            firstName: "Admin",
            lastName: "1",
            password: await hashPassword("password123"),
            role: "ADMIN",
            isActive: true,
            emailVerified: "2022-04-07T21:05:53.424Z",
            id: cuid()

        },
    });
    console.log(`created user with id ${user.id} and email ${user.email}`);
}


main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
