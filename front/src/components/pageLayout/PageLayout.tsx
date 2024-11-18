import { ReactNode } from 'react'
import { icons, LucideIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import TabsLayout, { TabItem } from './TabsLayout'

interface LayoutPageProps {
  title: string
  children: ReactNode
  tabItems?: TabItem[]
}

export function PageLayout({ title, tabItems, children }: LayoutPageProps) {
  return (
    <main className="w-full max-w-7xl px-4 lg:mx-auto">
      <div className="mx-auto flex w-full max-w-7xl flex-row">
        <h1 className="my-6 text-3xl font-bold capitalize">{title}</h1>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        {tabItems && <TabsLayout tabItems={tabItems} />}

        <div className="w-full">{children}</div>
      </div>
    </main>
  )
}
