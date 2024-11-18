import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type GlowProps = HTMLAttributes<HTMLDivElement> & {}

export function Glow({ className, ...rest }: GlowProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 -z-[1] flex">
      <div
        {...rest}
        className={cn(
          'absolute hidden h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary opacity-10 blur-[140px] contain-content dark:flex',
          className
        )}
      />
    </div>
  )
}
