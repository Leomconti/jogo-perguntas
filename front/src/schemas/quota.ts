import { z, string, number } from 'zod'

export const planNameSchema = z.enum(['free', 'starter', 'pro', 'business'])

export const quotaSchema = z.object({
  name: planNameSchema,
  projects: z.number(),
  teamMembers: z.number()
})

export type Quota = z.infer<typeof quotaSchema>
export type PlanName = z.infer<typeof planNameSchema>
