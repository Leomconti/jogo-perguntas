'use server'

import { api } from '@/services/api'
import { AxiosCustomError, AxiosCustomResponse } from '@/types/api'
import { PlanName, Quota } from '@/schemas/quota'

interface CreatePaymentLinkRequest {
  interval: 'monthly' | 'yearly'
  plan: Omit<PlanName, 'free'>
}

interface CreatePaymentLinkResponse {
  url: string
}

export const createPaymentLink = async (req: CreatePaymentLinkRequest) => {
  const { interval, plan } = req

  try {
    console.log(api)
    const response = await api.post<CreatePaymentLinkResponse>(
      `/payments/link`,
      {
        interval,
        plan
      }
    )
    console.log(response.data)

    return { data: response.data }
  } catch (err) {
    const error = err as AxiosCustomError
    console.log(error.response.data)

    return {
      error: error.response.data.message || 'Erro, tente novamente mais tarde.'
    }
  }
}
