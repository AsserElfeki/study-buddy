import bcrypt from 'bcrypt'


export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash)
    return result
}
