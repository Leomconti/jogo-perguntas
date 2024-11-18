import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <figure className="relative">
      <Link href="/app">
        <Image src="/logo.png" alt="logo" width={60} height={20} />
      </Link>
    </figure>
  )
}
