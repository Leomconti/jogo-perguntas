'use client'

import {
  Clock,
  CheckSquare,
  BarChart,
  Users,
  Zap,
  ChevronRight
} from 'lucide-react'

export const benefits = [
  {
    id: '0',
    title: 'Eficiência de Tempo',
    text: 'Reduz drasticamente o tempo necessário para criar um backlog de produto, permitindo que os Gerentes de Produto se concentrem em decisões estratégicas em vez de documentação.',
    iconUrl: () => <Clock />
  },
  {
    id: '1',
    title: 'Consistência',
    text: 'Garante uma abordagem padronizada para criação de backlog em todos os projetos e equipes, reduzindo erros humanos e oversights na coleta de requisitos.',
    iconUrl: () => <CheckSquare />,
    light: true
  },
  {
    id: '2',
    title: 'Priorização Inteligente',
    text: 'Usa IA para sugerir priorização baseada em valor de negócio e impacto do usuário, ajudando as equipes a focar nas características mais críticas primeiro.',
    iconUrl: () => <BarChart />
  },
  {
    id: '3',
    title: 'Aprendizado Contínuo',
    text: 'Evolui com seu uso, adaptando-se ao seu estilo de trabalho e necessidades específicas, refinando sua compreensão do seu negócio ao longo do tempo.',
    iconUrl: () => <Zap />,
    light: true
  },
  {
    id: '4',
    title: 'Melhoria na Colaboração',
    text: 'Facilita a comunicação entre equipes e stakeholders, promovendo um ambiente de trabalho mais coeso e produtivo.',
    iconUrl: () => <Users />
  },
  {
    id: '5',
    title: 'Integrações',
    text: 'Integre com as melhores ferramentas de gerenciamento de projetos, como Jira, Trello, Linear, ClickUp, entre outras, simplificando todo o fluxo de trabalho de desenvolvimento de produto.',
    iconUrl: () => <Users />
  }
]

export const GradientLight = () => {
  return (
    <div className="pointer-events-none absolute left-1/4 top-0 z-[-1] hidden aspect-square w-full bg-[radial-gradient(ellipse_at_center_200px,_var(--tw-gradient-stops))] from-primary to-primary/0 to-70% brightness-50 dark:flex" />
  )
}

export function Features() {
  return (
    <section id="features" className="overflow-hidden">
      <div className="z-2 relative">
        <h1 className="mx-auto mb-12 max-w-[50rem] text-2xl font-bold md:max-w-md md:text-center md:text-5xl lg:mb-20 lg:max-w-2xl">
          Potencialize suas entregas com Backlog Boost
        </h1>
        <div className="mb-10 grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-10">
          {benefits.map((item) => (
            <div
              className="relative block rounded-md border bg-background bg-[length:100%_100%] bg-no-repeat p-0.5 md:max-w-[24rem]"
              key={item.id}
            >
              <div className="pointer-events-none relative z-10 flex min-h-[22rem] flex-col rounded-md p-[2.4rem] shadow-sm">
                <h5 className="mb-5 text-2xl">{item.title}</h5>
                <p className="text-n-3 mb-6 text-muted-foreground">
                  {item.text}
                </p>
                <div className="mt-auto flex items-center">
                  {item.iconUrl()}
                </div>
              </div>
              {item.light && <GradientLight />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
