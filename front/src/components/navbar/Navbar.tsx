'use client'

import { NavLink } from './NavLink'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  href: string
}

interface Navbar {
  navItems: NavItem[]
}

export function Navbar({ navItems }: Navbar) {
  const pathname = usePathname()

  const isSelected = (href: string) => {
    if (href === '/app' && pathname === '/app') return true

    if (href.startsWith('/app/project/')) {
      const isRoot = href.split('/').length === 4

      if (isRoot && pathname === href) return true
      else if (!isRoot) return pathname.startsWith(href)

      return false
    }

    if (href !== '/app') return pathname.startsWith(href)

    return false
  }

  return (
    <nav className="w-full border-b border-muted">
      <div className="flex w-full items-center justify-start overflow-x-auto p-1 px-4 lg:justify-center lg:px-1">
        <ul className="flex h-7 w-max items-center gap-7">
          {navItems.map(({ href, label }) => {
            const selected = isSelected(href)

            return (
              <div key={href} className="relative">
                <NavLink
                  href={href}
                  className={cn('leading-7', selected && 'text-foreground')}
                >
                  {label}
                </NavLink>
                {selected && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -left-0 top-[29.5px] z-50 h-[0.15rem] w-full rounded-3xl bg-primary"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </div>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
