'use client'

import Image from 'next/image'

export function Footer() {
  return (
    <footer className="px-4 py-10 md:p-6">
      <div className="mx-auto max-w-[1300px]">
        <div className="flex flex-wrap justify-between gap-6 md:items-center">
          <figure>
            <Image
              src="/logo-light.svg"
              alt="logo"
              width={100}
              height={40}
              className="dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt="logo"
              width={100}
              height={40}
              className="hidden dark:block"
            />
          </figure>

          <span className="text-sm text-muted-foreground">
            © 2024 – Copyright
          </span>
        </div>
      </div>
    </footer>
  )
}
