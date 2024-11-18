import { NavLink } from '@/components/navbar/NavLink'
import { FileTextIcon } from 'lucide-react'
import Image from 'next/image'

interface ChatProps {
  name: string
  href: string
  onClick: () => void
}

export function Chat({ name, href, onClick }: ChatProps) {
  return (
    <div className="w-40 rounded-sm border">
      <NavLink href={href} className="block p-0" onClick={onClick}>
        <figure className="flex h-40 w-full items-center justify-center bg-muted transition-colors">
          <FileTextIcon className="h-20 w-20" strokeWidth={1} />
        </figure>
        <div className="p-4">
          <h3 className="overflow-hidden text-ellipsis text-nowrap text-center text-xs font-semibold md:text-sm">
            {name}
          </h3>
        </div>
      </NavLink>
    </div>
  )
}
