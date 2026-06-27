import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { auth } from '@/lib/mock-db/auth'
import { db } from '@/lib/mock-db/database'
import { rls } from '@/lib/mock-db/rls'
import { seedReady } from '@/lib/mock-db/seed'

const updateProfileSchema = z.object({
    full_name: z.string().min(2).max(100).optional(),
    specialty: z
        .enum([
            'Médico',
            'Psicólogo',
            'Abogado',
            'Consultor',
            'Terapeuta',
            'Nutricionista',
            'Entrenador Personal',
            'Otro',
        ])
        .optional(),
    bio: z.string().max(500).optional(),
    avatar_url: z.string().url().optional(),
    hourly_rate: z.number().min(0).optional(),
})

// GET /api/profiles - Get all profiles or specific profile
export async function GET(request: Request) {
    try {
        await seedReady
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const role = searchParams.get('role')

        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value
        const session = token ? await auth.getSession(token) : null

        if (id) {
            // Get specific profile
            const profile = db.getProfile(id)
            if (!profile) {
                return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
            }

            if (!rls.canSelectProfile(session, profile)) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
            }

            return NextResponse.json({ data: profile })
        }

        // Get all profiles (filtered by role if specified)
        let profiles = db.getAllProfiles()

        if (role === 'professional') {
            profiles = db.getProfessionals()
        }

        // Apply RLS
        profiles = rls.filterProfiles(session, profiles)

        return NextResponse.json({ data: profiles })
    } catch (error) {
        console.error('Get profiles error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PATCH /api/profiles - Update profile
export async function PATCH(request: Request) {
    try {
        await seedReady
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const session = await auth.getSession(token)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const validation = updateProfileSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            )
        }

        const profile = db.getProfile(session.user_id)
        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
        }

        // Check RLS
        if (!rls.canUpdateProfile(session, profile)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const updated = db.updateProfile(session.user_id, validation.data)

        return NextResponse.json({ data: updated })
    } catch (error) {
        console.error('Update profile error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
