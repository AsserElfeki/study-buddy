import NextAuth from 'next-auth'
import { authOptions } from '../../lib/auth.ts'

export default (req, res) => {
  return NextAuth(req, res, authOptions)
}
