import { PropsWithChildren } from 'react'
import { PageLayout } from '@/components/pageLayout/PageLayout'
import { CreditCard, Palette, Settings, Users } from 'lucide-react'
import { TabItem } from '@/components/pageLayout/TabsLayout'

const navItems: TabItem[] = [
  { href: '/app/settings', label: 'Meu perfil', icon: 'Settings' },
  { href: '/app/settings/theme', label: 'aparência', icon: 'Palette' },
  {
    href: '/app/settings/billing',
    label: 'Assinatura',
    icon: 'CreditCard'
  }
]

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <PageLayout title="configurações" tabItems={navItems}>
      {children}
    </PageLayout>
  )
}
