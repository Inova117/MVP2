'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { StatCard } from '@/components/dashboard/stat-card'
import { AppointmentCard } from '@/components/dashboard/appointment-card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { type Appointment } from '@/lib/mock-db/types'

interface DashboardUser {
    email: string
    full_name: string
    role: 'client' | 'professional'
}

function WelcomeSection({ user }: { user: DashboardUser }) {
    const firstName = user.full_name?.split(' ')[0] || ''
    return (
        <div>
            <h1 className="text-3xl font-bold text-ink-900">
                Hola, {firstName} 👋
            </h1>
            <p className="mt-2 text-ink-600">
                {user.role === 'professional'
                    ? 'Esto es lo que pasa con tu agenda hoy.'
                    : 'Un resumen de tus próximas citas.'}
            </p>
        </div>
    )
}

function StatsGrid({
    todayCount,
    pendingCount,
    totalCount,
    role,
}: {
    todayCount: number
    pendingCount: number
    totalCount: number
    role: 'client' | 'professional'
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
                label="Citas de hoy"
                value={todayCount}
                color="sage"
                hint={todayCount === 0 ? 'Sin citas para hoy' : 'Programadas para hoy'}
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            />
            <StatCard
                label={role === 'professional' ? 'Por confirmar' : 'En espera'}
                value={pendingCount}
                color="warning"
                hint={role === 'professional' ? 'Esperan tu confirmación' : 'Esperan confirmación'}
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
                label="Total de citas"
                value={totalCount}
                color="info"
                hint="Histórico completo"
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            />
        </div>
    )
}

function QuickActions({ role }: { role: 'client' | 'professional' }) {
    return (
        <div className="rounded-2xl border border-cream-200/80 bg-cream-100 p-6 shadow-tactile-sm">
            <h2 className="mb-4 font-serif text-lg font-bold text-ink-900">
                Acciones rápidas
            </h2>
            <div className="flex flex-wrap gap-3">
                {role === 'client' && (
                    <Link href="/dashboard/professionals">
                        <Button size="sm">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Reservar nueva cita
                        </Button>
                    </Link>
                )}
                {role === 'professional' && (
                    <Link href="/dashboard/availability">
                        <Button size="sm">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Configurar disponibilidad
                        </Button>
                    </Link>
                )}
                <Link href="/dashboard/profile">
                    <Button variant="outline" size="sm">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Editar perfil
                    </Button>
                </Link>
            </div>
        </div>
    )
}

function AppointmentsList({
    appointments,
    userRole,
}: {
    appointments: Appointment[]
    userRole: 'client' | 'professional'
}) {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-ink-900">
                    {userRole === 'professional' ? 'Tu agenda' : 'Próximas citas'}
                </h2>
                <Link
                    href="/dashboard/appointments"
                    className="text-sm font-semibold text-sage-700 transition-colors hover:text-sage-600"
                >
                    Ver todas →
                </Link>
            </div>
            {appointments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-cream-300 bg-cream-100/60 p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-ink-900">
                        Aún no hay citas
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-ink-500">
                        {userRole === 'client'
                            ? 'Reserva tu primera cita con un profesional para empezar.'
                            : 'Las citas aparecerán aquí cuando tus clientes reserven contigo.'}
                    </p>
                    {userRole === 'client' && (
                        <Link href="/dashboard/professionals" className="mt-6 inline-block">
                            <Button size="sm">Explorar profesionales</Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            userRole={userRole}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function DashboardPage() {
    const [user, setUser] = useState<DashboardUser | null>(null)
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: sessionData } = await supabase.auth.getSession()
            if (sessionData.session) {
                setUser({
                    email: sessionData.session.email,
                    full_name:
                        sessionData.session.profile?.full_name ||
                        sessionData.session.email,
                    role: sessionData.session.role,
                })

                const { data: appointmentsData } = await supabase
                    .from('appointments')
                    .select('*')
                    .order('start_time', { ascending: true })
                    .limit(5)
                    .execute()

                if (appointmentsData) {
                    setAppointments(appointmentsData as unknown as Appointment[])
                }
            }
            setLoading(false)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading)
        return (
            <div className="flex items-center justify-center p-16">
                <Spinner label="Cargando…" />
            </div>
        )
    if (!user) return null

    const todayAppointments = appointments.filter(
        (apt) =>
            new Date(apt.start_time).toDateString() === new Date().toDateString()
    )
    const pendingCount = appointments.filter(
        (apt) => apt.status === 'pending'
    ).length

    return (
        <div className="space-y-8">
            <WelcomeSection user={user} />
            <StatsGrid
                todayCount={todayAppointments.length}
                pendingCount={pendingCount}
                totalCount={appointments.length}
                role={user.role}
            />
            <QuickActions role={user.role} />
            <AppointmentsList appointments={appointments} userRole={user.role} />
        </div>
    )
}
