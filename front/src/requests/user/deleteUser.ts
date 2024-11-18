'use server'

import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface DeleteUserRequest {
  userId: string
}

interface DeleteUserResponse {}

export const deleteUser = async ({
  userId
}: DeleteUserRequest): Promise<AxiosCustomResponse<DeleteUserResponse>> => {
  try {
    const response = await api.delete<DeleteUserResponse>(`/users/${userId}`)

    return { data: response?.data }
  } catch (err) {
    const error = err as AxiosCustomError
    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
