import { CheckCircle, Trophy, Users } from 'lucide-react'

const steps = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Crie sua conta',
    description: 'Cadastre-se gratuitamente e comece sua jornada de aprendizado'
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Complete os Quizzes',
    description: 'Responda questões em diferentes níveis de dificuldade'
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: 'Ganhe Recompensas',
    description: 'Receba badges e pontos por suas conquistas'
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <h2 className="text-center text-3xl font-bold">Como Funciona</h2>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              {step.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
