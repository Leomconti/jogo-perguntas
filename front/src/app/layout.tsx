import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeWrapper } from '@/contexts/themeWrapper'
import './globals.css'
import { SessionWrapper } from '@/contexts/sessionWrapper'
import { QueryProviderWrapper } from '@/contexts/queryProviderWrapper'
import { WorkAroundAuth } from '@/WorkAround/WorkAroundAuth'
import { PosthogWrapper } from '@/contexts/PosthogWrapper'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('../contexts/PosthogPageView'), {
  ssr: false
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Backlog Boost',
  description:
    'Acelera a criação de backlog de produtos, melhora a colaboração e garante resultados consistentes e de alta qualidade em todos os projetos. Aproveite a IA para priorizar funcionalidades e simplificar seu processo de gerenciamento de produtos.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeWrapper
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <QueryProviderWrapper>
            <PosthogWrapper>
              <SessionWrapper>
                <WorkAroundAuth />
                <PostHogPageView />
                {children}
              </SessionWrapper>
            </PosthogWrapper>
          </QueryProviderWrapper>
        </ThemeWrapper>
        <Toaster />
      </body>
    </html>
  )
}
