'use server'

import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface EditUser {
  userId: string
  name: string
}

interface EditUser {}

export const editUser = async ({
  userId,
  name
}: EditUser): Promise<AxiosCustomResponse<EditUser>> => {
  try {
    const response = await api.put<EditUser>(`/users/${userId}`, {
      name
    })

    return { data: response?.data }
  } catch (err) {
    const error = err as AxiosCustomError
    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
