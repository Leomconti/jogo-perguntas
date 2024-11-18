'use client'

import { ReactNode } from 'react'
import { type ImageProps } from 'next/image'
import { UseCasesMobile } from './UseCasesMobile'
import { UseCasesDesktop } from './UseCasesDesktop'
import { cn } from '@/lib/utils'
import { BookOpen, Target, Trophy } from 'lucide-react'

interface UseCase {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: () => ReactNode
}

export const useCasesItem: Array<UseCase> = [
  {
    name: 'Iniciantes em Programação',
    summary: 'Comece sua jornada na programação de forma interativa',
    description:
      'Ideal para quem está começando a aprender programação. Os quizzes introdutórios cobrem conceitos básicos de lógica e algoritmos, com explicações detalhadas e feedback instantâneo.',
    image: '/quiz-beginner.png',
    icon: () => <BookOpen />
  },
  {
    name: 'Prática Contínua',
    summary: 'Fortaleça seus conhecimentos com desafios diários',
    description:
      'Para estudantes que já conhecem o básico e querem praticar regularmente. Desafios diários e quizzes temáticos mantêm o aprendizado constante e progressivo.',
    image: '/quiz-practice.png',
    icon: () => <Target />
  },
  {
    name: 'Preparação para Avaliações',
    summary: 'Prepare-se para provas e testes de programação',
    description:
      'Perfeito para estudantes que precisam se preparar para avaliações. Simulados completos e quizzes específicos por tema ajudam na revisão e fixação do conteúdo.',
    image: '/quiz-exam.png',
    icon: () => <Trophy />
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
