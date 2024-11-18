'use server'

import { Quota } from '@/schemas/quota'
import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'

interface GetUsageRequest {
  userId: string
}

interface GetUsageResponse {
  quota: Quota
  usage: Omit<Quota, 'name'>
}

export const getUsage = async ({
  userId
}: GetUsageRequest): Promise<AxiosCustomResponse<GetUsageResponse>> => {
  try {
    const response = await api.get<GetUsageResponse>(
      `/payments/usage/${userId}`
    )

    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError
    return {
      error:
        error.response.data.message ||
        'Erro ao buscar uso de pagamento. Tente novamente mais tarde.'
    }
  }
}
