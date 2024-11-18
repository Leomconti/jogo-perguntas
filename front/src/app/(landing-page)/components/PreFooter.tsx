'use client'

import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import Link from 'next/link'
import posthog from 'posthog-js'

export function PreFooter() {
  return (
    <section className="relative space-y-8 pb-40 pt-10 text-center">
      <div className="text-center">
        <h1 className="mb-5 w-full break-words text-3xl font-extrabold uppercase md:text-5xl">
          Agilize Seus Projetos, Transforme transcrições em
          <span className="bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text px-1 text-transparent">
            {' '}
            Backlog Estruturado
          </span>
        </h1>
        <p className="text-muted-foreground">
          Não perca tempo organizando suas tarefas manualmente. Nossa solução
          permite criar e gerenciar backlogs de forma rápida e eficiente
        </p>
        <div className="mx-auto mt-16 h-max w-max rounded-full bg-gradient-to-br from-primary to-rose-400 p-[2px]">
          <Link href="/sign-up">
            <Button
              className="h-max items-center gap-2 rounded-full bg-background px-16 py-3 font-semibold uppercase"
              variant="outline"
              onClick={() => {
                posthog.capture('pre-footer-click')
              }}
            >
              Comece de graça
              <Send className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
