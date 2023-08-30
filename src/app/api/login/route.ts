import prisma from '@/lib/prisma'
//import { getSession } from 'next-auth/react'
import { comparePassword } from '@/lib/hashPassword'

export default async function handler(req, res) {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    // compare hashes
    let compareResult = false;

    if (user && password && user.password)
        compareResult = await comparePassword(password, user.password)

    if (compareResult) {
        res.status(200).json({ user })
    } else {
        res.status(401).json({ result: null })
    }
}
