import { SelectUser } from '../db/schema'
import { Quota, quotas } from '../db/schema/quotas'
import { AppError } from './errorHandler'

export const getQuota = async (user: SelectUser): Promise<Quota> => {
  if (!user.subscriptionId) {
    return quotas.find((quota) => quota.name === 'free')!
  }

  const quota = quotas.find((quota) =>
    quota.priceIds.includes(user.subscriptionPriceId ?? '')
  )

  if (!quota) {
    return quotas.find((quota) => quota.name === 'free')!
  }

  return quota
}

export const getQuotaFromSubscriptionPriceId = async (
  subscriptionPriceId: string
): Promise<Quota> => {
  const quota = quotas.find((quota) =>
    quota.priceIds.includes(subscriptionPriceId ?? '')
  )

  if (!quota) {
    return quotas.find((quota) => quota.name === 'free')!
  }

  return quota
}
