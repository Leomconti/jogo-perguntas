import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subscriptionId: z.string().nullable(),
  subscriptionStatus: z.string().nullable(),
  subscriptionPriceId: z.string().nullable(),
  customerId: z.string()
})

export type User = z.infer<typeof userSchema>

export const userSessionSchema = userSchema
  .omit({
    subscriptionId: true,
    subscriptionStatus: true,
    subscriptionPriceId: true,
    customerId: true
  })
  .extend({
    accessToken: z.string()
  })

export type UserSession = z.infer<typeof userSessionSchema>

export const userJWTSchema = userSchema
  .omit({
    subscriptionId: true,
    subscriptionStatus: true,
    subscriptionPriceId: true,
    customerId: true
  })
  .extend({
    exp: z.number(),
    iat: z.number()
  })

export type UserJWT = z.infer<typeof userJWTSchema>
