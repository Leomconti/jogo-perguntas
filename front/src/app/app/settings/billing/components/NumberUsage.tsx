import { Progress } from '@/components/ui/progress'
import { SimpleTooltip } from '@/components/ui/simpletootip'
import { CircleHelpIcon } from 'lucide-react'
import { title } from 'process'

interface NumberUsageProps {
  title: string
  helpText: string
  usage: number
  quota: number
}

export const NumberUsage = ({
  title,
  helpText,
  usage,
  quota
}: NumberUsageProps) => {
  return (
    <div className="space-y-2 p-6">
      <header className="flex flex-col justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-light">
          {title}
          <SimpleTooltip content={helpText}>
            <CircleHelpIcon className="h-4 w-4 text-muted-foreground" />
          </SimpleTooltip>
        </h3>
      </header>
      <main>
        <h3 className="flex items-center gap-2 text-2xl text-muted-foreground/80">
          <span className="text-foreground">{usage}</span>
          <span>/</span>
          <span>{quota}</span>
        </h3>
      </main>
    </div>
  )
}
