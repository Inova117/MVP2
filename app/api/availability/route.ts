import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { auth } from '@/lib/mock-db/auth'
import { db } from '@/lib/mock-db/database'
import { seedReady } from '@/lib/mock-db/seed'

const createAvailabilitySchema = z.object({
    day_of_week: z.number().min(0).max(6),
    start_time: z.string().regex(/^\d{2}:\d{2}$/),
    end_time: z.string().regex(/^\d{2}:\d{2}$/),
    appointment_duration: z.union([
        z.literal(30),
        z.literal(60),
        z.literal(90),
        z.literal(120),
    ]),
})

// GET /api/availability - Get availability settings
export async function GET(request: Request) {
    try {
        await seedReady
        const { searchParams } = new URL(request.url)
        const professionalId = searchParams.get('professionalId') || searchParams.get('professional_id')

        if (!professionalId) {
            return NextResponse.json(
                { error: 'Professional ID required' },
                { status: 400 }
            )
        }

        const settings = db.getAvailabilityByProfessional(professionalId)

        return NextResponse.json({ data: settings })
    } catch (error) {
        console.error('Get availability error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/availability - Create availability setting
export async function POST(request: Request) {
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
        const validation = createAvailabilitySchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            )
        }

        // Verify user is a professional
        const profile = db.getProfile(session.user_id)
        if (!profile || profile.role !== 'professional') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const settingData = {
            professional_id: session.user_id,
            ...validation.data,
        }

        const setting = db.createAvailability(settingData)

        return NextResponse.json({ data: setting }, { status: 201 })
    } catch (error) {
        console.error('Create availability error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/availability/:id - Delete availability setting
export async function DELETE(request: Request) {
    try {
        await seedReady
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Availability ID required' },
                { status: 400 }
            )
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const session = await auth.getSession(token)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const profile = db.getProfile(session.user_id)
        if (!profile || profile.role !== 'professional') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        db.deleteAvailability(id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete availability error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
