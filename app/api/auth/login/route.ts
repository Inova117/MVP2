import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/mock-db/auth'
import { seedReady } from '@/lib/mock-db/seed'

const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

export async function POST(request: Request) {
    try {
        await seedReady
        const body = await request.json()
        const validation = signInSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            )
        }

        const { email, password } = validation.data

        const result = await auth.signIn(email, password)

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 401 })
        }

        // Set HTTP-only cookie with JWT
        const response = NextResponse.json({ session: result.session })

        response.cookies.set('auth-token', result.token!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
