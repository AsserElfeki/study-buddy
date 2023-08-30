import bcrypt from 'bcrypt'


export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash)
    return result
}
