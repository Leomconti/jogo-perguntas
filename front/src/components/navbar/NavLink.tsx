import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { HTMLAttributes } from 'react'

type NavLinkProps = LinkProps & HTMLAttributes<HTMLAnchorElement>

export function NavLink({ children, className, ...rest }: NavLinkProps) {
  return (
    <Link
      className={cn(
        'p-1 text-sm font-medium capitalize text-muted-foreground hover:text-foreground',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
