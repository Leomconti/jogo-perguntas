import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { HTMLAttributes } from 'react'

type NavLinkProps = LinkProps & HTMLAttributes<HTMLAnchorElement>

export function NavLink({ children, className, ...rest }: NavLinkProps) {
  return (
    <Link {...rest}>
      <li
        className={cn(
          'list-none transition-all duration-300 hover:text-foreground',
          className
        )}
      >
        {children}
      </li>
    </Link>
  )
}
