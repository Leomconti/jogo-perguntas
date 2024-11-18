'use server'

import { api } from '@/services/api'

interface SignInRequest {
  email: string
  password: string
}
interface SignInResponse {
  access_token: string
}

export const signIn = async ({
  email,
  password
}: SignInRequest): Promise<SignInResponse> => {
  const response = await api.post<SignInResponse>('/signIn', {
    email: email,
    password: password
  })

  return response.data
}
