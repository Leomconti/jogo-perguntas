'use client'

import { BookOpen, Trophy, BarChart, Users, Zap, Medal } from 'lucide-react'

export const benefits = [
  {
    id: '0',
    title: 'Níveis Progressivos',
    text: 'Quizzes organizados em diferentes níveis de dificuldade, permitindo uma evolução gradual no aprendizado de lógica de programação.',
    iconUrl: () => <BookOpen />
  },
  {
    id: '1',
    title: 'Sistema de Recompensas',
    text: 'Ganhe badges e pontos por completar desafios, mantendo a motivação alta durante todo o processo de aprendizagem.',
    iconUrl: () => <Trophy />,
    light: true
  },
  {
    id: '2',
    title: 'Feedback Instantâneo',
    text: 'Receba feedback imediato após cada resposta, entendendo seus erros e acertos para um aprendizado mais efetivo.',
    iconUrl: () => <Zap />
  },
  {
    id: '3',
    title: 'Acompanhamento de Progresso',
    text: 'Visualize seu progresso através de estatísticas detalhadas e gráficos de desempenho em cada tema.',
    iconUrl: () => <BarChart />,
    light: true
  },
  {
    id: '4',
    title: 'Multiplataforma',
    text: 'Acesse a plataforma de qualquer dispositivo, com interface responsiva e adaptada para melhor experiência.',
    iconUrl: () => <Users />
  },
  {
    id: '5',
    title: 'Ranking e Competição',
    text: 'Compare seu desempenho com outros estudantes através de rankings semanais e conquistas especiais.',
    iconUrl: () => <Medal />
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
