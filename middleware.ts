import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/mock-db/auth'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value

    // Protected dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Verify token
        const session = await auth.getSession(token)
        if (!session) {
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete('auth-token')
            return response
        }
    }

    // Redirect authenticated users away from auth pages
    if (
        token &&
        (request.nextUrl.pathname === '/login' ||
            request.nextUrl.pathname === '/register')
    ) {
        const session = await auth.getSession(token)
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
}
