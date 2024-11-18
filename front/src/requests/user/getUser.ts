'use server'

import { User } from '@/schemas/user'
import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface GetUserRequest {
  id: string
}

type GetUserResponse = User

export const getUser = async ({
  id
}: GetUserRequest): Promise<AxiosCustomResponse<GetUserResponse>> => {
  try {
    const response = await api.get<GetUserResponse>(`/users/${id}`)

    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError

    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
