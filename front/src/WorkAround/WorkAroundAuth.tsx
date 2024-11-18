'use client'

import { UserJWT } from '@/schemas/user'
import { jwtDecode } from 'jwt-decode'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

// TODO: in the future move this check to middleware
// This is a workaround to check if the user still have a valid token
export const WorkAroundAuth = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user.accessToken) {
      const token = session.user.accessToken
      const decodedToken = jwtDecode(token) as UserJWT

      const isTokenValid = (token: UserJWT) => {
        const tokenExpirationTime = new Date(token.exp * 1000)
        const now = new Date()

        if (tokenExpirationTime <= now) {
          console.error('Token has expired')
          return false
        }

        return true
      }

      if (!isTokenValid(decodedToken)) {
        signOut()
      }
    }
  }, [session])

  return <></>
}
