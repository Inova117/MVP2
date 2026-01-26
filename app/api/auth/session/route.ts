import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { auth } from '@/lib/mock-db/auth'
import { db } from '@/lib/mock-db/database'
import '@/lib/mock-db/seed'

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token) {
            return NextResponse.json({ session: null })
        }

        const session = await auth.getSession(token)
        if (!session) {
            return NextResponse.json({ session: null })
        }

        // Get full profile data
        const profile = db.getProfile(session.user_id)

        return NextResponse.json({
            session: {
                ...session,
                profile,
            },
        })
    } catch (error) {
        console.error('Session error:', error)
        return NextResponse.json({ session: null })
    }
}
