import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-center pt-44">
      <p className="text-center text-lg text-muted-foreground">
        Aprenda Lógica de Programação de Forma Divertida
      </p>
      <div className="relative bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
        <h1 className="text-center text-5xl font-bold md:text-7xl">
          Quiz Code
        </h1>
      </div>
      <p className="mt-6 max-w-2xl text-center text-lg text-muted-foreground">
        Uma plataforma interativa de quiz para aprender algoritmos e lógica de programação.
        Progrida através de diferentes níveis, ganhe recompensas e aprenda programando.
      </p>

      <div className="mt-10 flex gap-4">
        <Link href="/sign-up">
          <Button size="lg" className="gap-2">
            Começar Agora
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="#how-it-works">
          <Button variant="outline" size="lg">
            Como Funciona
          </Button>
        </Link>
      </div>

      <div className="relative mt-16 flex items-center justify-center">
        <div className="rounded-xl border-2 border-muted bg-card p-4 shadow-lg">
          <img
            src="/quiz-preview.png"
            alt="Preview da plataforma de quiz"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-[50%] z-10 bg-gradient-to-t from-background"></div>
      </div>
    </section>
  )
}
