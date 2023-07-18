import NextAuth, { CookiesOptions, NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from 'bcryptjs'

import prisma from "@/lib/prisma"

const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

            // Try to find the user and also return the password field
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email,
                  }
            })

            if(!user) { throw new Error('No user with a matching email was found.')}

            const passwordValid = await compare(credentials!.password, user.password )

            if(!passwordValid){ throw new Error("Your password is invalid") }

            return {
                id: user.id + '',
                email: user.email,
                name: user.fullName,
                role: user.role,
            }
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/signup"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token }) => {
            console.log('Session Callback', { session, token })
            return {
              ...session,
              user: {
                ...session.user,
                id: token.id,
                role: token.role
              }
            }
          },
          jwt: ({ token, user }) => {
            console.log('JWT Callback', { token, user })
            if (user) {
              return {
                ...token,
                id: user.id,
                role: user.role
              }
            }
            return token
          }
    },
}

export default NextAuth(options)

