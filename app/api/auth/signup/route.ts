import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/mock-db/auth'
import { seedReady } from '@/lib/mock-db/seed' // Initialize seed data

const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain uppercase letter')
        .regex(/[0-9]/, 'Must contain number'),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    role: z.enum(['client', 'professional']),
})

export async function POST(request: Request) {
    try {
        await seedReady
        const body = await request.json()
        const validation = signUpSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            )
        }

        const { email, password, fullName, role } = validation.data

        const result = await auth.signUp(email, password, fullName, role)

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 400 })
        }

        // Set HTTP-only cookie with JWT
        const response = NextResponse.json(
            { session: result.session },
            { status: 201 }
        )

        response.cookies.set('auth-token', result.token!, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
