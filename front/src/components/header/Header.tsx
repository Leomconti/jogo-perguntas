'use client'

import { UserDropdown } from './UserDropdown'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams<{ id: string }>()

  return (
    <header className="flex h-[68px] w-full items-center justify-between p-2 pt-2 md:h-[52px] md:px-6 md:pb-0">
      <div className="flex items-center gap-[10px] p-2 md:pb-2">
        <Link href="/app">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={80}
            height={40}
            className="dark:hidden"
          />
          <Image
            src="/logo.jpg"
            alt="logo"
            width={80}
            height={40}
            className="hidden dark:block"
          />
        </Link>
      </div>

      <div className="flex items-center gap-1">
        {session?.user && <UserDropdown user={session?.user} />}
      </div>
    </header>
  )
}
