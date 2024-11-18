'use server'

import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface SignUpRequest {
  email: string
  password: string
  name: string
}
interface SignUpResponse {}

export const signUp = async ({
  email,
  password,
  name
}: SignUpRequest): Promise<AxiosCustomResponse<SignUpResponse>> => {
  try {
    const response = await api.post<SignUpResponse>('/signUp', {
      email,
      password,
      name
    })

    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError

    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
