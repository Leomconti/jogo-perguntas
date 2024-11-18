'use client'

import { Glow } from '@/components/glow/glow'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useState } from 'react'

const plans = {
  monthly: [
    {
      title: 'Free Plan',
      description: 'For testing and evaluation or small-scale deployments.',
      price: '$0',
      advantages: ['30K events/month included', 'startups']
    },
    {
      title: 'Pro Plan',
      description: 'Good place for bigger projects, startups, and businesses.',
      price: '$12.84',
      advantages: ['250K events/month included', '$0.0012 per additional event']
    },
    {
      title: 'Emprise Plan',
      description: 'Good place for bigger projects, startups, and businesses.',
      price: '$20.84',
      advantages: ['250K events/month included', '$0.0012 per additional event']
    }
  ],
  yearly: [
    {
      title: 'Free Plan',
      description: 'For testing and evaluation or small-scale deployments.',
      price: '$190',
      advantages: ['30K events/month included', 'startups']
    },
    {
      title: 'Pro Plan',
      description: 'Good place for bigger projects, startups, and businesses.',
      price: '$550',
      advantages: ['250K events/month included', '$0.0012 per additional event']
    },
    {
      title: 'Emprise Plan',
      description: 'Good place for bigger projects, startups, and businesses.',
      price: '$3900',
      advantages: ['250K events/month included', '$0.0012 per additional event']
    }
  ]
}

export function Plans() {
  const [plan, setPlan] = useState<keyof typeof plans>('monthly')

  return (
    <section className="w-full pb-20 md:pb-40" id="plans">
      <h1 className="mb-12 text-center text-4xl font-bold">Planos </h1>

      <div className="mx-auto mb-12 w-max space-x-4 rounded-full bg-secondary p-2">
        <Button
          className={cn(
            'rounded-full p-6 shadow-none',
            plan === 'monthly' && 'bg-background hover:bg-background'
          )}
          variant="secondary"
          onClick={() => setPlan('monthly')}
        >
          Mensal
        </Button>
        <Button
          className={cn(
            'rounded-full p-6 shadow-none',
            plan === 'yearly' && 'bg-background hover:bg-background'
          )}
          variant="secondary"
          onClick={() => setPlan('yearly')}
        >
          Anual
        </Button>
      </div>
      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10">
        {plans[plan].map(({ title, price, description, advantages }) => (
          <div className="group relative" key={title}>
            <Glow className="left-1/2 h-full w-full -translate-x-1/2 opacity-0 transition-all duration-500 group-hover:opacity-40" />
            <Card className="flex w-full cursor-pointer flex-col items-center p-8">
              <CardHeader className="space-y-2">
                <CardTitle className="text-center text-xl">{title}</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mb-12 mt-10 flex flex-col items-center gap-2">
                <h1 className="text-5xl font-bold">{price}</h1>
                <span>por {plan === 'monthly' ? 'mês' : 'ano'}</span>

                <div className="mt-5 space-y-2">
                  {advantages.map((advantage) => (
                    <div className="flex items-center gap-1" key={advantage}>
                      <Check />
                      <span>{advantage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="h-max w-max px-10 py-3 text-lg font-medium uppercase"
                  variant="outline"
                >
                  Começar agora
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}
