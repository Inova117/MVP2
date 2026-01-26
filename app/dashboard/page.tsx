'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { StatCard } from '@/components/dashboard/stat-card'
import { AppointmentCard } from '@/components/dashboard/appointment-card'
import { Button } from '@/components/ui/button'
import { type Appointment } from '@/lib/mock-db/types'

interface DashboardUser {
    email: string
    full_name: string
    role: 'client' | 'professional'
}

function WelcomeSection({ user }: { user: DashboardUser }) {
    const firstName = user.full_name?.split(' ')[0] || 'there'
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {firstName}! 👋
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                {user.role === 'professional'
                    ? "Here's what's happening with your appointments today."
                    : "Here's an overview of your upcoming appointments."}
            </p>
        </div>
    )
}

function StatsGrid({ todayCount, pendingCount, totalCount }: { todayCount: number; pendingCount: number; totalCount: number }) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                label="Today's Appointments"
                value={todayCount}
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                color="primary"
            />
            <StatCard
                label="Pending Approval"
                value={pendingCount}
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                color="warning"
            />
            <StatCard
                label="Total Appointments"
                value={totalCount}
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                color="success"
            />
        </div>
    )
}

function QuickActions({ role }: { role: 'client' | 'professional' }) {
    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
                {role === 'client' && (
                    <Link href="/dashboard/professionals">
                        <Button>
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Book New Appointment
                        </Button>
                    </Link>
                )}
                {role === 'professional' && (
                    <Link href="/dashboard/availability">
                        <Button>
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Manage Availability
                        </Button>
                    </Link>
                )}
                <Link href="/dashboard/profile">
                    <Button variant="outline">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Edit Profile
                    </Button>
                </Link>
            </div>
        </div>
    )
}

function AppointmentsList({ appointments, userRole }: { appointments: Appointment[]; userRole: 'client' | 'professional' }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userRole === 'professional' ? "Today's Schedule" : 'Upcoming Appointments'}
                </h2>
                <Link href="/dashboard/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                    View all →
                </Link>
            </div>
            {appointments.length === 0 ? (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No appointments yet</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {userRole === 'client' ? 'Get started by booking your first appointment.' : 'Appointments will appear here once clients book with you.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.slice(0, 3).map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} userRole={userRole} />
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
                    full_name: sessionData.session.profile?.full_name || sessionData.session.email,
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
    }, []) // Only run once on mount

    if (loading) return <div className="flex items-center justify-center p-8">Loading...</div>
    if (!user) return null

    const todayAppointments = appointments.filter((apt) => new Date(apt.start_time).toDateString() === new Date().toDateString())
    const pendingCount = appointments.filter((apt) => apt.status === 'pending').length

    return (
        <div className="space-y-6">
            <WelcomeSection user={user} />
            <StatsGrid todayCount={todayAppointments.length} pendingCount={pendingCount} totalCount={appointments.length} />
            <QuickActions role={user.role} />
            <AppointmentsList appointments={appointments} userRole={user.role} />
        </div>
    )
}
