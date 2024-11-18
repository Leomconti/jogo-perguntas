import { Progress } from '@/components/ui/progress'
import { SimpleTooltip } from '@/components/ui/simpletootip'
import { CircleHelpIcon } from 'lucide-react'

interface ProgressUsageProps {
  title: string
  helpText: string
  quota: number
  usage: number
}
export const ProgressUsage = ({
  title,
  helpText,
  quota,
  usage
}: ProgressUsageProps) => {
  const percentage = (usage / quota) * 100
  return (
    <div className="space-y-2 p-6">
      <header className="flex flex-col justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-light">
          {title}
          <SimpleTooltip content={helpText}>
            <CircleHelpIcon className="h-4 w-4 text-muted-foreground" />
          </SimpleTooltip>
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="space-x-1 text-muted-foreground">
            <span>{usage}</span>
            <span>/</span>
            <span>{quota}</span>
          </span>
          <span className="text-muted-foreground">
            ({percentage.toFixed(2)}%)
          </span>
        </div>
      </header>
      <main>
        <Progress value={percentage} />
      </main>
    </div>
  )
}
