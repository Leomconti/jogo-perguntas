import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { ArrowUpRight, Menu } from 'lucide-react'
import { NavLink } from './NavLink'
import { links } from './SliderTabs'

export function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild className="max-md:flex sm:hidden">
        <Button
          variant="outline"
          className="border-none bg-transparent !shadow-none outline-none"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetHeader className="sr-only">
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>
      <SheetContent className="w-full border-none bg-background backdrop-blur-lg backdrop-filter dark:bg-transparent">
        <div className="flex h-full flex-col items-center justify-center gap-12 pt-6">
          {links.map(({ link, name }) => (
            <NavLink
              key={name}
              href={link}
              className="justify-center text-2xl font-medium uppercase text-foreground hover:text-background"
            >
              {name}
            </NavLink>
          ))}
          <NavLink
            href="sign-in"
            className="flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-2xl font-medium uppercase text-foreground hover:text-background"
          >
            sign-in
            <ArrowUpRight className="" />
          </NavLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}
