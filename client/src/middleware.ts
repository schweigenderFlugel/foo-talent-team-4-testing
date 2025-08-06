import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value

    const pathname = request.nextUrl.pathname

    const isAuthRoute = pathname === '/login' || pathname === '/register'
    const isProtectedRoute = pathname.startsWith('/dashboard')

    // Si intenta entrar al login o register y ya tiene token, redirigimos al dashboard
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Si intenta entrar al dashboard sin token, redirigimos al login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Si no se cumple ninguna condición, dejar pasar
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/dashboard',
    ],
}
