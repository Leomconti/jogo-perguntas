import { PropsWithChildren } from 'react'
import { getServerAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Header } from '@/components/header/Header'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession()

  return (
    <div className="w-full">
      <Header />
      <main>{children}</main>
    </div>
  )
}
