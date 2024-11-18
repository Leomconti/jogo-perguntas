'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {
  FileTextIcon,
  LogOutIcon,
  LucideIcon,
  MoonIcon,
  RocketIcon,
  Settings2Icon,
  SunIcon,
  UsersIcon
} from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

type UserDropdownProps = {
  user: Session['user']
}

type DropdownItem = {
  label: string
  icon: LucideIcon
  highlight?: boolean
} & ({ path: string } | { onClick: () => void })

export function UserDropdown({ user }: UserDropdownProps) {
  const { theme, setTheme } = useTheme()

  const dropdownItems: (DropdownItem | 'separator')[] = [
    {
      label: 'Projetos',
      icon: FileTextIcon,
      path: '/app'
    },

    {
      label: 'configurações',
      path: '/app/settings',
      icon: Settings2Icon
    },
    'separator',
    {
      label: 'upgrade',
      path: '/app/settings/billing',
      icon: RocketIcon,
      highlight: true
    },
    {
      label: 'Trocar tema',
      icon: theme === 'light' ? MoonIcon : SunIcon,
      onClick: () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }
    },
    'separator',
    {
      label: 'sair',
      icon: LogOutIcon,
      onClick: () => {
        signOut()
      }
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center justify-between gap-2 rounded-full transition-colors hover:bg-foreground/5">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="font-semibold capitalize">
              {user.name?.[0]}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-xl p-3"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-semibold leading-none">{user.name}</p>
            <p className="text-xs font-semibold leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          {dropdownItems.map((item, index) => {
            if (item === 'separator') {
              return <DropdownMenuSeparator key={index} />
            }
            const dropdownItem = (onClick?: () => void) => (
              <DropdownMenuItem
                className={cn(
                  'cursor-pointer capitalize text-muted-foreground',
                  item.highlight &&
                    'text-primary data-[data-highlighted]:bg-primary-foreground data-[highlighted]:text-primary'
                )}
                onClick={onClick}
                key={item.label}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </DropdownMenuItem>
            )

            if ('path' in item) {
              return (
                <Link href={item.path} key={item.label}>
                  {dropdownItem()}
                </Link>
              )
            }

            return dropdownItem(item.onClick)
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
