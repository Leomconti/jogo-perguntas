'use server'

import { api } from '@/services/api'
import { AxiosCustomError } from '@/types/api'

interface ManagePlanRequest {}

interface ManagePlanResponse {
  url: string
}

export const managePlan = async () => {
  try {
    const response = await api.get<ManagePlanResponse>(`/payments/manage`)

    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError
    console.log(error.response.data)
    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
