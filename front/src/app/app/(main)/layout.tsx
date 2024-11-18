import { PropsWithChildren } from 'react'
import { Navbar } from '@/components/navbar/Navbar'

const NavItems = [
  { href: '/app', label: 'projetos' },
  { href: '/app/settings', label: 'configurações' }
]

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="w-full">
      <Navbar navItems={NavItems} />
      {children}
    </main>
  )
}
