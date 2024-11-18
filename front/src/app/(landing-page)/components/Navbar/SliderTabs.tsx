'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Tab } from './Tab'
import { ArrowUpRight } from 'lucide-react'
import { Cursor } from './Cursor'
import { MenuMobile } from './MenuMobile'

export const links = [
  {
    name: 'Início',
    link: '/#started'
  },

  {
    name: 'Casos de uso',
    link: '#use-cases'
  },
  {
    name: 'Recursos',
    link: '/#features'
  },
  {
    name: 'Planos',
    link: '/#plans'
  }
]

export function SlideTabs() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0
  })

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0
        }))
      }}
      className="relative mx-auto flex w-full items-center rounded-none border-2 border-muted-foreground/5 bg-gradient-to-tr from-background/5 via-gray-400/5 to-transparent px-5 py-3 text-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-lg backdrop-filter sm:w-max sm:rounded-full"
    >
      <Link href="/" className="mr-4 flex h-fit shrink-0 items-start">
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
      </Link>

      <nav className="hidden sm:flex">
        {links.map(({ name, link }, index) => (
          <Link key={name} className="h-full w-full text-nowrap" href={link}>
            <Tab setPosition={setPosition}>{name}</Tab>
          </Link>
        ))}
      </nav>

      <div className="flex flex-1 justify-end">
        <Link
          href="/sign-in"
          className="bg-page-gradient text-md group ml-3 hidden w-full items-start justify-start gap-x-2 rounded-3xl border border-foreground/50 px-5 py-3 duration-200 hover:border-muted-foreground hover:bg-transparent/5 sm:inline-flex sm:w-auto"
        >
          Login
          <div className="relative ml-1 flex h-5 w-5 items-center justify-center overflow-hidden">
            <ArrowUpRight className="absolute transition-all duration-500 group-hover:-translate-y-5 group-hover:translate-x-4" />
            <ArrowUpRight className="absolute -translate-x-4 -translate-y-5 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
        </Link>
        <MenuMobile />
      </div>

      <Cursor position={position} />
    </ul>
  )
}
