'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { CheckCircle2, Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getUsage } from '@/requests/payments/getUsage'
import { useSession } from 'next-auth/react'
import { PlanName, planNameSchema } from '@/schemas/quota'
import { createPaymentLink } from '@/requests/payments/createPaymentLink'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import posthog from 'posthog-js'
import Link from 'next/link'

type PricingSwitchProps = {
  onSwitch: (value: string) => void
  value: string
}

type PricingCardProps = {
  isYearly?: boolean
  isLandingPage?: boolean
  title: string
  monthlyPrice?: number
  yearlyPrice?: number
  description: string
  features: string[]
  actionLabel: string
  actionDisabled?: boolean
  popular?: boolean
  exclusive?: boolean
  plan: Omit<PlanName, 'free'>
}

const PricingHeader = ({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-extrabold md:text-5xl">{title}</h2>
    <p className="pt-4 font-medium">{subtitle}</p>
    <br />
  </section>
)

const PricingSwitch = ({ onSwitch, value }: PricingSwitchProps) => (
  <Tabs value={value} className="mx-auto w-max" onValueChange={onSwitch}>
    <TabsList className="gap-4 px-2 py-6">
      <TabsTrigger
        value="monthly"
        className="relative text-base data-[state=active]:bg-transparent"
      >
        <span className="z-10">Mensal</span>
        {value === 'monthly' && (
          <motion.div
            layoutId="pricing-switch-underline"
            className="absolute -left-0 h-full w-full rounded-md bg-background mix-blend-soft-light"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
          />
        )}
      </TabsTrigger>
      <TabsTrigger
        value="yearly"
        className="group relative text-base data-[state=active]:bg-transparent"
      >
        <span className="z-10">Anual</span>
        {value === 'yearly' && (
          <motion.div
            layoutId="pricing-switch-underline"
            className="absolute -left-0 h-full w-full rounded-md bg-background mix-blend-soft-light"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
          />
        )}
      </TabsTrigger>
    </TabsList>
  </Tabs>
)

const PricingCard = ({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
  actionDisabled,
  plan,
  isLandingPage
}: PricingCardProps) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  //  bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-slate-100 dark:hover:bg-slate-100 shadow before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]

  return (
    <Card
      className={cn(
        `relative flex w-72 flex-col justify-between py-1 ${popular ? 'border-primary' : 'border-muted'} mx-auto cursor-pointer sm:mx-0`,
        {
          'animate-background-shine bg-[length:200%_100%] transition-colors dark:bg-[linear-gradient(110deg,#000103_30%,#1e2631_45%,#000103_60%)]':
            exclusive
        }
      )}
    >
      {exclusive && (
        <Link
          href="/sign-up"
          className="absolute bottom-0 left-0 right-0 top-0 z-30 animate-background-shine bg-[linear-gradient(110deg,#ffffff00_30%,#fff_45%,#ffffff00_60%)] bg-[length:200%_100%] transition-colors dark:hidden"
        />
      )}

      <div>
        <CardHeader className="pb-8 pt-4">
          {isYearly && yearlyPrice && monthlyPrice ? (
            <div className="flex justify-between">
              <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
                {title}
              </CardTitle>
              <div
                className={cn(
                  'h-fit rounded-full bg-zinc-200 px-2.5 py-1 text-sm text-black dark:bg-zinc-800 dark:text-white',
                  {
                    'bg-gradient-to-r from-primary to-rose-400 dark:text-black':
                      popular
                  }
                )}
              >
                Economize R${monthlyPrice * 12 - yearlyPrice}
              </div>
            </div>
          ) : (
            <CardTitle className="text-lg text-zinc-700 dark:text-zinc-300">
              {title}
            </CardTitle>
          )}
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">
              {yearlyPrice && isYearly
                ? 'R$' + yearlyPrice
                : monthlyPrice
                  ? 'R$' + monthlyPrice
                  : 'Grátis'}
            </h3>
            <span className="mb-1 flex flex-col justify-end text-sm">
              {yearlyPrice && isYearly ? (
                <>
                  <span className="font-bold">/ano</span>
                  <span className="text-xs text-gray-500">
                    (R${(yearlyPrice / 12).toFixed(2)}/mês)
                  </span>
                </>
              ) : monthlyPrice ? (
                '/mês'
              ) : null}
            </span>
          </div>
          <CardDescription className="h-12 pt-1.5">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {features.map((feature: string) => (
            <CheckItem key={feature} text={feature} />
          ))}
        </CardContent>
      </div>
      <CardFooter className="mt-2">
        <Button
          variant={popular ? 'default' : 'outline'}
          className="w-full"
          disabled={actionDisabled}
          onClick={async () => {
            posthog.capture('pricing-click', {
              plan,
              isLandingPage
            })
            if (plan === 'free') {
              router.push('/sign-in')
              return
            }
            if (!session?.user) {
              router.push('/sign-in')
              return
            }
            setIsLoading(true)
            const link = await createPaymentLink({
              interval: isYearly ? 'yearly' : 'monthly',
              plan: planNameSchema.Enum.starter
            })
            setIsLoading(false)
            if (link.error)
              toast({
                title: 'Erro',
                description: link.error,
                variant: 'destructive'
              })
            if (link.data) window.open(link.data?.url, '_blank')
          }}
        >
          {isLoading ? <Loader2Icon className="animate-spin" /> : actionLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
  </div>
)

interface PricingPageProps {
  title?: boolean
  free?: boolean
}

export function PricingPage({ title, free }: PricingPageProps) {
  const [isYearly, setIsYearly] = useState(false)
  const { data: session } = useSession()
  const togglePricingPeriod = (value: string) => setIsYearly(value === 'yearly')

  const { data } = useQuery({
    queryKey: ['getUsage'],
    queryFn: () =>
      getUsage({
        userId: session?.user.id as string
      }),
    enabled: !!session?.user.id
  })

  const currentPlan = data?.data?.quota.name

  const plans: PricingCardProps[] = [
    ...(free
      ? [
          {
            title: 'Free',
            description: 'Experimente o Backlog Boost gratuitamente',
            features: ['1 projeto', '1 usuário', '1 transcrições por mês'],
            monthlyPrice: 0,
            yearlyPrice: 0,
            actionLabel: 'Começar grátis',
            plan: 'free'
          }
        ]
      : []),

    {
      title: 'Starter',
      monthlyPrice: 49,
      yearlyPrice: 490,
      description: 'Ideal para pequenas equipes e projetos',
      features: [
        '3 projetos',
        '5 usuários',
        '20 transcrições por mês',
        'Geração de até 50 histórias de usuário',
        'Priorização básica de backlog',
        'Integrações',
        'Suporte especializado'
      ],
      actionLabel: currentPlan === 'starter' ? 'Atual' : 'Comprar',
      actionDisabled: currentPlan === 'starter',
      plan: 'starter'
    },
    {
      title: 'Pro',
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: 'Para equipes em crescimento e projetos complexos',
      features: [
        '10 projetos',
        '15 usuários',
        'Transcrições ilimitadas',
        'Geração ilimitada de histórias de usuário',
        'Priorização avançada de backlog',
        'Integrações',
        'Suporte prioritário'
      ],
      actionLabel: 'Comprar',
      popular: true,
      plan: 'pro'
    },
    {
      title: 'Enterprise',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: 'Solução personalizada para grandes organizações',
      features: [
        'Projetos ilimitados',
        'Usuários ilimitados',
        'Todas as funcionalidades do plano Pro',
        'API personalizada',
        'Integrações personalizadas',
        'Treinamento dedicado',
        'Gerente de conta exclusivo'
      ],
      actionLabel: 'Contate-nos',
      exclusive: true,
      plan: 'business'
    }
  ]
  return (
    <section id="plans" className="py-8">
      {title && (
        <PricingHeader
          title="Planos escaláveis"
          subtitle="Escolha o plano ideal para você"
        />
      )}
      <PricingSwitch
        onSwitch={togglePricingPeriod}
        value={isYearly ? 'yearly' : 'monthly'}
      />
      <div className="mt-8 flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
        {plans.map((plan) => {
          return (
            <PricingCard
              key={plan.title}
              {...plan}
              isYearly={isYearly}
              isLandingPage={!!free}
            />
          )
        })}
      </div>
    </section>
  )
}
