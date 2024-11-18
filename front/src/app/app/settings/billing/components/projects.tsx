'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { getUsage } from '@/requests/payments/getUsage'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ProgressUsage } from './ProgressUsage'
import { NumberUsage } from './NumberUsage'
import { useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import { managePlan } from '@/requests/payments/managePlan'
import { useToast } from '@/components/ui/use-toast'

export const Projects = () => {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const { data } = useQuery({
    queryKey: ['getUsage'],
    queryFn: () =>
      getUsage({
        userId: session?.user.id ?? ''
      }),
    enabled: !!session?.user.id
  })

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>Uso do Plano</CardTitle>
        <CardDescription>
          Você está atualmente no{' '}
          <Badge className="capitalize">{data?.data?.quota.name} </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 divide-x divide-border p-0 md:grid-cols-2">
        <ProgressUsage
          title="Projetos"
          helpText="Numero de projetos que voce pode criar simultaneamente"
          quota={data?.data?.quota.projects ?? 0}
          usage={data?.data?.usage.projects ?? 0}
        />
        <NumberUsage
          title="Membros da Equipe"
          helpText="Numero de membros da equipe que voce pode ter"
          usage={data?.data?.usage.teamMembers ?? 0}
          quota={data?.data?.quota.teamMembers ?? 0}
        />
      </CardContent>
      <CardFooter className="border-t border-border pt-6 text-sm text-muted-foreground">
        {data?.data?.quota.name !== 'free' && (
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <span>
              Para aumentar seus limites, considere mudar para um plano superior
            </span>
            <Button
              type="submit"
              variant={'outline'}
              className="min-w-36"
              onClick={async () => {
                setIsLoading(true)
                const link = await managePlan()
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
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                'Gerenciar plano'
              )}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
