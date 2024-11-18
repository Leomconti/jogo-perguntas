import { NextAuthOptions, getServerSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { jwtDecode } from 'jwt-decode'
import { UserJWT, UserSession } from '@/schemas/user'
import { env } from '@/env'
import { signIn } from '@/requests/auth/signIn'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app'
  },

  secret: env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        const credentialsSchema = z.object({
          email: z.string(),
          password: z.string()
        })

        const { success, data } = credentialsSchema.safeParse(credentials)

        if (!success) return null

        try {
          const { access_token } = await signIn({
            email: data.email,
            password: data.password
          })

          const userJWT: UserJWT = jwtDecode(access_token)

          const user: UserSession = {
            id: userJWT.id,
            name: userJWT.name,
            email: userJWT.email,
            createdAt: userJWT.createdAt,
            updatedAt: userJWT.updatedAt,
            accessToken: access_token
          }

          return user
        } catch (e) {
          const error = e as Error
          console.error('Error during authentication:', error.message)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = (user as UserSession).accessToken
        token.user = user as UserSession
      }

      if (trigger === 'update') {
        token.user = session.user
      }

      // // Check if the token is still valid
      // const decodedToken = jwtDecode(token.accessToken)
      // const currentTime = Math.floor(Date.now() / 1000)
      // if ((decodedToken?.exp ?? 0) < currentTime) {
      //   const { token: accessToken, refresh: refreshed } = await refreshToken({
      //     refreshToken: token.refreshToken
      //   })
      //   token.accessToken = accessToken
      //   token.refreshToken = refreshed
      // }

      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user
      return session
    }
  }
}

export const getServerAuthSession = () => getServerSession(authOptions)
