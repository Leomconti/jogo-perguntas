import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/get-url'
import { getToken } from 'next-auth/jwt'
import { env } from './env'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: env.AUTH_SECRET
  })

  const pathname = request.nextUrl.pathname

  const publicRoutes = ['/sign-in', '/sign-up']
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL(getUrl('/app')))
  }

  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getUrl('/sign-in')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
