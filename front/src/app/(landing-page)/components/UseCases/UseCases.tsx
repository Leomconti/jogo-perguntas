'use client'

import { ReactNode } from 'react'
import { type ImageProps } from 'next/image'
import { UseCasesMobile } from './UseCasesMobile'
import { UseCasesDesktop } from './UseCasesDesktop'
import { cn } from '@/lib/utils'
import { FileText, Users, Zap, Target } from 'lucide-react'

interface UseCase {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: () => ReactNode
}

export const useCasesItem: Array<UseCase> = [
  {
    name: 'Transformação de Transcrições',
    summary:
      'Converta transcrições de reuniões em backlogs estruturados rapidamente.',
    description:
      'Transforme transcrições brutas de reuniões de produto em backlogs estruturados e priorizados em minutos. Ideal para equipes que realizam frequentes sessões de brainstorming e precisam de uma maneira eficiente de organizar as ideias discutidas.',
    image: '/story_3.jpeg',
    icon: () => <FileText />
  },
  {
    name: 'Adaptação Rápida a Mudanças de Mercado',
    summary:
      'Atualize rapidamente o backlog com base em novas informações de mercado.',
    description:
      'Quando surgem novas tendências de mercado ou feedback de clientes, use o Backlog Boost para rapidamente incorporar essas mudanças no seu backlog existente. Isso permite que as equipes sejam mais ágeis e responsivas às necessidades do mercado.',
    image: '/story_3.jpeg',
    icon: () => <Zap />
  },
  {
    name: 'Alinhamento de Múltiplos Projetos',
    summary:
      'Mantenha consistência e priorização entre backlogs de diferentes projetos.',
    description:
      'Para organizações gerenciando múltiplos produtos ou projetos, o Backlog Boost ajuda a manter consistência na estrutura e priorização dos backlogs. Isso facilita o alinhamento estratégico e a alocação de recursos entre diferentes iniciativas.',
    image: '/story_3.jpeg',
    icon: () => <Target />
  }
]

export function UseCases() {
  return (
    <section
      id="use-cases"
      className="bg-page-gradient relative mt-10 w-full bg-opacity-0"
    >
      <Container>
        <div className="absolute inset-0 h-full rotate-180 blur-xl"></div>
        <div className="relative mr-auto max-w-3xl md:text-start">
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-br from-primary via-primary/70 to-transparent bg-clip-text text-transparent drop-shadow-[2px_2px_10px_rgba(0,0,0,0.2)]">
              Backlog Boost <br />
            </span>
            Potencialize suas entregas
          </h2>
          <p className="mt-4 text-lg tracking-tight text-muted-foreground">
            Transforme <b>transcrições brutas</b> de reuniões em backlogs de
            produto estruturados e priorizados em <b>minutos</b>, não semanas.
            Nossa solução impulsionada por IA acelera o processo de planejamento
            de produto, melhora a colaboração e garante consistência em todos os
            seus projetos.
          </p>
          <div className="overflow-x-hidden overflow-y-hidden">
            <div className="absolute right-0 top-[0%] z-20 h-40 w-[17%] overflow-x-hidden bg-primary bg-opacity-20 blur-[200px]" />
          </div>
        </div>
        <UseCasesMobile />
        <UseCasesDesktop />
      </Container>
    </section>
  )
}

export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
