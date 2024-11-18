import { NextFunction, Request, Response } from 'express'
import { createPaymentLinkDTO } from '../dtos/payment.dto'
import { AppError } from '../../../utils/errorHandler'
import { count, eq } from 'drizzle-orm'
import { db } from '../../../db'
import { stripe } from '../../../services/stripe'
import { users } from '../../../db/schema'
import { env } from '../../../env'
import { Plan } from '../../../db/schema/quotas'
import console from 'console'
import { getQuotaFromSubscriptionPriceId } from '../../../utils/checkQuota'

export class PaymentController {
  async createPaymentLink(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!
      const { plan, interval } = createPaymentLinkDTO.parse(req.body)

      const prices: Record<
        Exclude<Plan, 'free'>,
        { monthly: string; yearly: string }
      > = {
        starter: {
          monthly: env.STRIPE_PRICE_ID_STARTER_MONTHLY,
          yearly: env.STRIPE_PRICE_ID_STARTER_YEARLY
        },
        pro: {
          monthly: env.STRIPE_PRICE_ID_PRO_MONTHLY,
          yearly: env.STRIPE_PRICE_ID_PRO_YEARLY
        },
        business: {
          monthly: env.STRIPE_PRICE_ID_BUSINESS_MONTHLY,
          yearly: env.STRIPE_PRICE_ID_BUSINESS_YEARLY
        }
      }

      const priceId = prices[plan as keyof typeof prices][interval]

      if (!priceId) {
        throw new AppError('Plano inválido', 400)
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        metadata: {
          userId: user.id
        },
        success_url: `${env.FRONTEND_URL}/payment/success`,
        cancel_url: `${env.FRONTEND_URL}/payment/canceled`,
        client_reference_id: user.id,
        customer: user.customerId ?? undefined
      })

      res.status(200).json({ url: session.url })
    } catch (error) {
      next(error)
    }
  }

  async createPricingPage(req: Request, res: Response, next: NextFunction) {
    try {
      const pricingPageUrl = `${env.FRONTEND_URL}/pricing`

      res.status(200).json({ url: pricingPageUrl })
    } catch (error) {
      next(error)
    }
  }

  async handleWebhook(req: Request, res: Response, next: NextFunction) {
    const user = req.user!
    const sig = req.headers['stripe-signature'] as string

    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody as string,
        sig,
        env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      const error = err as Error
      console.log('error', error.message)
      res.status(400).send(`Webhook Error: ${error.message}`)
      return
    }

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        {
          const subscription = event.data.object

          const stripeCustomerId = subscription.customer as string

          const stripeSubscriptionId = subscription.id as string
          const stripeSubscriptionStatus = subscription.status
          const stripePriceId = subscription.items.data[0].price.id

          await db
            .update(users)
            .set({
              subscriptionId: stripeSubscriptionId,
              subscriptionStatus: stripeSubscriptionStatus,
              subscriptionPriceId: stripePriceId
            })
            .where(eq(users.id, user.id))
        }
        break
      case 'customer.subscription.deleted':
        await db
          .update(users)
          .set({
            subscriptionId: null,
            subscriptionStatus: null,
            subscriptionPriceId: null
          })
          .where(eq(users.id, user.id))
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.status(200).send()
  }
  async pruchasePlan(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!

      const subscription = await stripe.billingPortal.sessions.create({
        customer: user.customerId as string,
        return_url: `${env.FRONTEND_URL}/dashboard`
      })

      res.status(200).json({ url: subscription.url })
    } catch (error) {
      next(error)
    }
  }

  async manageSubscription(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!

      const subscription = await stripe.billingPortal.sessions.create({
        customer: user.customerId as string,
        return_url: `${env.FRONTEND_URL}/dashboard`
      })

      res.status(200).json({ url: subscription.url })
    } catch (error) {
      next(error)
    }
  }

  async getUsage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: organizationId } = req.params
      const user = req.user!

      const { priceIds, ...quota } = await getQuotaFromSubscriptionPriceId(
        user.subscriptionPriceId ?? ''
      )

      //fazer as queries da permissao

      // const [[projectsUsage], [usersUsage], [invitesUsage]] = await Promise.all(
      //   [
      //     db
      //       .select({ count: count() })
      //       .from(projects)
      //       .where(eq(projects.organizationId, organization.id)),
      //     db
      //       .select({ count: count() })
      //       .from(users)
      //       .where(eq(users.organizationId, organization.id)),
      //     db
      //       .select({ count: count() })
      //       .from(organizationInvitations)
      //       .where(eq(organizationInvitations.organizationId, organization.id))
      //   ]
      // )

      res.status(200).json({
        quota,
        usage: {
          haha: 'ahahha'
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
