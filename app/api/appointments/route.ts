import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { auth } from '@/lib/mock-db/auth'
import { db } from '@/lib/mock-db/database'
import { rls } from '@/lib/mock-db/rls'
import { seedReady } from '@/lib/mock-db/seed'

const createAppointmentSchema = z
    .object({
        professionalId: z.string().uuid(),
        title: z.string().min(3).max(100),
        description: z.string().max(500).optional(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
    })
    .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
        message: 'End time must be after start time',
    })

const updateAppointmentSchema = z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
    cancellation_reason: z.string().max(500).optional(),
})

// GET /api/appointments - Get appointments
export async function GET(request: Request) {
    try {
        await seedReady
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const session = await auth.getSession(token)
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (id) {
            // Get specific appointment
            const appointment = db.getAppointment(id)
            if (!appointment) {
                return NextResponse.json(
                    { error: 'Appointment not found' },
                    { status: 404 }
                )
            }

            if (!rls.canSelectAppointment(session, appointment)) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
            }

            return NextResponse.json({ data: appointment })
        }

        // Get all appointments for user
        const appointments = db.getAppointmentsByUser(session.user_id)
        const filtered = rls.filterAppointments(session, appointments)

        return NextResponse.json({ data: filtered })
    } catch (error) {
        console.error('Get appointments error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/appointments - Create appointment
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
        const validation = createAppointmentSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            )
        }

        const { professionalId, title, description, startTime, endTime } =
            validation.data

        const appointmentData = {
            client_id: session.user_id,
            professional_id: professionalId,
            title,
            description,
            start_time: startTime,
            end_time: endTime,
            status: 'pending' as const,
        }

        // Check RLS
        if (!rls.canInsertAppointment(session, appointmentData)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const appointment = db.createAppointment(appointmentData)

        if (!appointment) {
            return NextResponse.json(
                { error: 'Slot no longer available' },
                { status: 409 }
            )
        }

        return NextResponse.json({ data: appointment }, { status: 201 })
    } catch (error) {
        console.error('Create appointment error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PATCH /api/appointments/:id - Update appointment
export async function PATCH(request: Request) {
    try {
        await seedReady
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Appointment ID required' },
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

        const appointment = db.getAppointment(id)
        if (!appointment) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 }
            )
        }

        const body = await request.json()
        const validation = updateAppointmentSchema.safeParse(body)

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.errors },
                { status: 400 }
            )
        }

        // Check RLS
        if (!rls.canUpdateAppointment(session, appointment, validation.data)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        const updated = db.updateAppointment(id, validation.data)

        return NextResponse.json({ data: updated })
    } catch (error) {
        console.error('Update appointment error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/appointments/:id - Delete appointment
export async function DELETE(request: Request) {
    try {
        await seedReady
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Appointment ID required' },
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

        const appointment = db.getAppointment(id)
        if (!appointment) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 }
            )
        }

        // Check RLS
        if (!rls.canDeleteAppointment(session, appointment)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        db.deleteAppointment(id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Delete appointment error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
