import { cn } from '@/lib/utils'
import { ImageProps } from 'next/image'

interface UseCase {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: React.ComponentType
}

export function UseCase({
  useCase,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  useCase: UseCase
  isActive: boolean
}) {
  return (
    <div
      className={cn(
        className,
        'focus:outline-none',
        !isActive && 'opacity-75 hover:opacity-100'
      )}
      {...props}
    >
      <div
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg',
          isActive ? `bg-primary text-background` : 'bg-muted'
        )}
      >
        <useCase.icon />
      </div>
      <h3
        className={cn(
          'mt-4 text-sm font-medium',
          !isActive && 'text-muted-foreground'
        )}
      >
        {useCase.name}
      </h3>
      <p className="font-display mt-2 text-xl text-foreground">
        {useCase.summary}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {useCase.description}
      </p>
    </div>
  )
}
