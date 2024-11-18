import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().optional(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  FRONTEND_URL: z.string(),
  STRIPE_PRICE_ID_STARTER_MONTHLY: z.string(),
  STRIPE_PRICE_ID_STARTER_YEARLY: z.string(),
  STRIPE_PRICE_ID_PRO_MONTHLY: z.string(),
  STRIPE_PRICE_ID_PRO_YEARLY: z.string(),
  STRIPE_PRICE_ID_BUSINESS_MONTHLY: z.string(),
  STRIPE_PRICE_ID_BUSINESS_YEARLY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_USERNAME: z.string(),
  EMAIL_PASSWORD: z.string(),
  EMAIL_PORT: z.string(),
  EMAIL_FROM: z.string()
})

export const env = envSchema.parse(process.env)
