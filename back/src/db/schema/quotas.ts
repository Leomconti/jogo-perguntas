import z from 'zod'
import { env } from '../../env'

export const planSchema = z.enum(['free', 'starter', 'pro', 'business'])

export type Plan = z.infer<typeof planSchema>

export const quotaSchema = z.object({
  priceIds: z.array(z.string()),
  name: planSchema,
  projects: z.number().int().positive(),
  teamMembers: z.number().int().positive()
})

export type Quota = z.infer<typeof quotaSchema>

export const quotas: Quota[] = [
  {
    priceIds: [],
    name: 'free',
    projects: 2,
    teamMembers: 2
  },
  {
    priceIds: [
      env.STRIPE_PRICE_ID_STARTER_MONTHLY,
      env.STRIPE_PRICE_ID_STARTER_YEARLY
    ],
    name: 'starter',
    projects: 2,
    teamMembers: 2
  },
  {
    priceIds: [env.STRIPE_PRICE_ID_PRO_MONTHLY, env.STRIPE_PRICE_ID_PRO_YEARLY],
    name: 'pro',
    projects: 4,
    teamMembers: 3
  },
  {
    priceIds: [
      env.STRIPE_PRICE_ID_BUSINESS_MONTHLY,
      env.STRIPE_PRICE_ID_BUSINESS_YEARLY
    ],
    name: 'business',
    projects: 10,
    teamMembers: 10
  }
]
