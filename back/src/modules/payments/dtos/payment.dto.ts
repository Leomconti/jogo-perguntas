import z from 'zod'
import { planSchema } from '../../../db/schema/quotas'

export const createPaymentLinkDTO = z.object({
  plan: planSchema.exclude(['free']),
  interval: z.enum(['monthly', 'yearly']).optional().default('monthly')
})

export type CreatePaymentLinkDTO = z.infer<typeof createPaymentLinkDTO>
