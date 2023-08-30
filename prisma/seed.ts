import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Executes the main function.
 *
 * @return {Promise<void>} A promise that resolves when the function has finished executing.
 */
async function main() {
    const password = await hash("password123", 12);
    const user = await prisma.user.upsert({
        where: { email: "admin@admin.com" },
        update: {},
        create: {
            email: "admin@admin.com",
            firstName: "Admin",
            lastName: "1",
            password,
        },
    });
    // console.log({ user });
}


main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
