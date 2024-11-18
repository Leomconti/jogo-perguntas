'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { z } from 'zod'

export const themeFormSchema = z.object({
  theme: z.string()
})

export default function ThemeForm() {
  const { theme, setTheme } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tema</CardTitle>
        <CardDescription>Selecione o tema para o painel.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(value) => setTheme(value)}
          className="grid max-w-md grid-cols-1 gap-8 pt-2 sm:grid-cols-2"
        >
          <label htmlFor="light">
            <RadioGroupItem value="light" id="light" className="sr-only" />

            <div
              className={cn(
                'items-center rounded-md border-2 border-muted p-1 hover:border-accent',
                theme === 'light' && 'border-primary'
              )}
            >
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              Light
            </span>
          </label>{' '}
          <label htmlFor="dark">
            <RadioGroupItem id="dark" value="dark" className="sr-only" />

            <div
              className={cn(
                'items-center rounded-md border-2 border-muted bg-popover p-1 hover:text-accent-foreground',
                theme === 'dark' && 'border-primary'
              )}
            >
              <div className="space-y-2 rounded-sm bg-slate-900 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>

            <span className="block w-full p-2 text-center font-normal">
              Dark
            </span>
          </label>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
