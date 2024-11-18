'use client'

import { usePathname } from 'next/navigation'
import { NavLink } from '../navbar/NavLink'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { icons, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

export type TabItem = {
  href: string
  label: string
  icon: keyof typeof icons
}

interface TabsLayoutProps {
  tabItems: TabItem[]
}

export default function TabsLayout({ tabItems }: TabsLayoutProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const currentTab = tabItems?.find((item) => item.href === pathname)

  const defaultValue = currentTab?.label || tabItems?.[0]?.label

  const [value, setValue] = useState(defaultValue)

  return (
    <nav className="w-full lg:max-w-48">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full overflow-x-auto rounded-md lg:w-full"
        orientation="horizontal"
      >
        <TabsList className="flex h-max w-max overflow-hidden gap-6 rounded-md px-3 py-2 sm:w-full lg:flex-col lg:gap-2 lg:bg-background lg:p-0">
          {tabItems.map(({ href, icon: Icon, label }) => {
            const LucideIcon = icons[Icon]
            return (
              <NavLink
                href={href}
                className="flex w-full flex-1 p-0"
                draggable={false}
                key={href}
              >
                <TabsTrigger
                  value={label}
                  className={cn(
                    'relative flex items-start gap-3 rounded-sm px-2 py-3 font-semibold capitalize leading-6 data-[state=active]:bg-transparent sm:flex-1 lg:w-full lg:justify-start lg:p-2 data-[state=active]:text-primary-foreground',
                  )}
                >
                  <span className="z-10">
                    <LucideIcon className="h-5 w-5" />
                  </span>
                  <span className={'z-10'}>{label}</span>
                  {value === label && (
                    <motion.div
                      layoutId="tabs-switch"
                      className="absolute left-0 top-0 h-full w-full rounded-md bg-primary/80"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}
                </TabsTrigger>
              </NavLink>
            )
          })}
        </TabsList>
      </Tabs>
    </nav>
  )
}
