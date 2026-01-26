'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { AppointmentCard } from '@/components/dashboard/appointment-card'
import { AppointmentTabs } from '@/components/appointments/appointment-tabs'
import { AppointmentActions } from '@/components/appointments/appointment-actions'
import { ClientAppointmentActions } from '@/components/appointments/client-appointment-actions'
import { RejectModal } from '@/components/appointments/reject-modal'
import { Alert } from '@/components/ui/alert'
import { type Appointment, type Session } from '@/lib/mock-db/types'

type AppointmentTab = 'pending' | 'upcoming' | 'past'

export default function AppointmentsPage() {
    const [user, setUser] = useState<Session | null>(null)
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [activeTab, setActiveTab] = useState<AppointmentTab>('pending')
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [rejectModal, setRejectModal] = useState<{ isOpen: boolean; appointmentId: string; title: string }>({
        isOpen: false,
        appointmentId: '',
        title: '',
    })
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: sessionData } = await supabase.auth.getSession()
            if (!sessionData.session) {
                router.push('/login')
                return
            }

            setUser(sessionData.session)

            // Fetch appointments
            const filterKey = sessionData.session.role === 'professional' ? 'professional_id' : 'client_id'
            const { data: appointmentsData } = await supabase
                .from('appointments')
                .select('*')
                .eq(filterKey, sessionData.session.user_id)
                .order('start_time', { ascending: true })
                .execute()

            const data = (appointmentsData as { data?: Appointment[] })?.data
            if (data) {
                setAppointments(data)
            }
            setLoading(false)
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run once on mount

    const filterAppointments = (tab: AppointmentTab) => {
        const now = new Date()

        switch (tab) {
            case 'pending':
                return appointments.filter((apt) => apt.status === 'pending')
            case 'upcoming':
                return appointments.filter(
                    (apt) => apt.status === 'confirmed' && new Date(apt.start_time) > now
                )
            case 'past':
                return appointments.filter(
                    (apt) => apt.status === 'completed' || new Date(apt.start_time) < now
                )
            default:
                return []
        }
    }

    const handleConfirm = async (appointmentId: string) => {
        try {
            setActionLoading(true)
            setError(null)

            await supabase
                .from('appointments')
                .eq('id', appointmentId)
                .update({ status: 'confirmed', updated_at: new Date().toISOString() })

            // Update local state
            setAppointments(
                appointments.map((apt) =>
                    apt.id === appointmentId ? { ...apt, status: 'confirmed' as const } : apt
                )
            )

            setSuccess('Appointment confirmed successfully!')
            setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
            console.error('Failed to confirm appointment:', err)
            setError('Failed to confirm appointment')
        } finally {
            setActionLoading(false)
        }
    }

    const handleRejectClick = (appointmentId: string, title: string) => {
        setRejectModal({ isOpen: true, appointmentId, title })
    }

    const handleRejectConfirm = async (reason: string) => {
        try {
            setActionLoading(true)
            setError(null)

            await supabase
                .from('appointments')
                .eq('id', rejectModal.appointmentId)
                .update({
                    status: 'cancelled',
                    cancellation_reason: reason,
                    updated_at: new Date().toISOString(),
                })

            // Update local state
            setAppointments(
                appointments.map((apt) =>
                    apt.id === rejectModal.appointmentId
                        ? { ...apt, status: 'cancelled' as const, cancellation_reason: reason }
                        : apt
                )
            )

            setRejectModal({ isOpen: false, appointmentId: '', title: '' })
            setSuccess('Appointment rejected successfully!')
            setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
            console.error('Failed to reject appointment:', err)
            setError('Failed to reject appointment')
        } finally {
            setActionLoading(false)
        }
    }

    const handleComplete = async (appointmentId: string) => {
        try {
            setActionLoading(true)
            setError(null)

            await supabase
                .from('appointments')
                .eq('id', appointmentId)
                .update({ status: 'completed', updated_at: new Date().toISOString() })

            // Update local state
            setAppointments(
                appointments.map((apt) =>
                    apt.id === appointmentId ? { ...apt, status: 'completed' as const } : apt
                )
            )

            setSuccess('Appointment marked as completed!')
            setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
            console.error('Failed to complete appointment:', err)
            setError('Failed to complete appointment')
        } finally {
            setActionLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Loading appointments...
                    </p>
                </div>
            </div>
        )
    }

    const filteredAppointments = filterAppointments(activeTab)
    const counts = {
        pending: appointments.filter((apt) => apt.status === 'pending').length,
        upcoming: appointments.filter((apt) => apt.status === 'confirmed' && new Date(apt.start_time) > new Date()).length,
        past: appointments.filter((apt) => apt.status === 'completed' || new Date(apt.start_time) < new Date()).length,
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    My Appointments
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your appointments and bookings
                </p>
            </div>

            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="error">{error}</Alert>}

            <AppointmentTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={counts}
            />

            <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                            No {activeTab} appointments
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {activeTab === 'pending' && 'No pending appointments requiring action.'}
                            {activeTab === 'upcoming' && 'No upcoming confirmed appointments.'}
                            {activeTab === 'past' && 'No completed appointments yet.'}
                        </p>
                    </div>
                ) : (
                    filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="space-y-3">
                            <AppointmentCard
                                appointment={appointment}
                                userRole={user?.role || 'client'}
                            />
                            {user?.role === 'professional' && (
                                <AppointmentActions
                                    status={appointment.status}
                                    onConfirm={() => handleConfirm(appointment.id)}
                                    onReject={() => handleRejectClick(appointment.id, appointment.title)}
                                    onComplete={() => handleComplete(appointment.id)}
                                    loading={actionLoading}
                                />
                            )}
                            {user?.role === 'client' && (
                                <ClientAppointmentActions
                                    status={appointment.status}
                                    onCancel={() => handleRejectClick(appointment.id, appointment.title)}
                                    loading={actionLoading}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>

            <RejectModal
                isOpen={rejectModal.isOpen}
                appointmentTitle={rejectModal.title}
                onConfirm={handleRejectConfirm}
                onCancel={() => setRejectModal({ isOpen: false, appointmentId: '', title: '' })}
            />
        </div>
    )
}
