'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { MailIcon } from 'lucide-react'
import posthog from 'posthog-js'

export const Contact = () => {
  return (
    <section id="community">
      <div className="container py-10 sm:py-20">
        <div className="mx-auto lg:w-[60%]">
          <Card className="flex flex-col items-center justify-center border-none bg-transparent text-center shadow-none">
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-4xl font-bold md:text-5xl">
                <MailIcon className="h-10 w-10 text-muted-foreground" />
                <div>
                  Entre em
                  <span className="bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text pl-2 text-transparent drop-shadow-[2px_2px_10px_rgba(0,0,0,.2)]">
                    Contato
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xl text-muted-foreground lg:w-[80%]">
              Converse diretamente com a gente para saber mais sobre o Backlog
            </CardContent>

            <CardFooter>
              <Button
                asChild
                onClick={async () => {
                  posthog.capture('click-contact')
                }}
              >
                <a href="mailto:vitorlostada@hotmail.com" target="_blank">
                  Mande um email
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
