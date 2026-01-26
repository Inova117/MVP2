'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { BookingCalendar } from '@/components/booking/booking-calendar'
import { BookingSummary } from '@/components/booking/booking-summary'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import type { Profile, AvailabilitySetting, Appointment, Session } from '@/lib/mock-db/types'

type Step = 'calendar' | 'summary' | 'success'

interface BookingPageProps {
    params: Promise<{
        professionalId: string
    }>
}

export default function BookingPage({ params }: BookingPageProps) {
    // Unwrap params using React.use()
    const { professionalId } = use(params)

    const [step, setStep] = useState<Step>('calendar')
    const [professional, setProfessional] = useState<Profile | null>(null)
    const [availability, setAvailability] = useState<AvailabilitySetting[]>([])
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)
    const [user, setUser] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            // Get current user
            const { data: sessionData } = await supabase.auth.getSession()
            if (!sessionData.session) {
                router.push(`/login?redirect=/dashboard/book/${professionalId}`)
                return
            }
            setUser(sessionData.session)

            // Fetch professional details
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', professionalId)
                .execute()

            // Handle professional data
            let professionalProfile = null
            if (profileData) {
                if (Array.isArray(profileData)) {
                    professionalProfile = profileData[0]
                } else if (typeof profileData === 'object') {
                    professionalProfile = profileData
                }
            }

            if (!professionalProfile) {
                setError('Professional not found')
                setLoading(false)
                return
            }

            setProfessional(professionalProfile as Profile)

            // Fetch availability
            const { data: availData } = await supabase
                .from('availability')
                .select('*')
                .eq('professional_id', professionalId)
                .execute()

            // Handle availability data
            if (availData) {
                if (Array.isArray(availData)) {
                    setAvailability(availData as AvailabilitySetting[])
                } else if (typeof availData === 'object' && 'data' in availData) {
                    setAvailability((availData as { data: AvailabilitySetting[] }).data || [])
                }
            }

            // Fetch existing appointments (to check conflicts)
            const { data: aptData } = await supabase
                .from('appointments')
                .select('*')
                .eq('professional_id', professionalId)
                .execute()

            const aptResult = (aptData as { data?: Appointment[] })?.data
            if (aptResult) {
                setAppointments(aptResult)
            }

            setLoading(false)
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [professionalId]) // Only depend on professionalId

    const handleSlotSelect = (start: Date, end: Date) => {
        setSelectedSlot({ start, end })
        setStep('summary')
    }

    const handleConfirm = async () => {
        if (!selectedSlot || !user || !professional) return

        setSubmitLoading(true)
        setError(null)

        try {
            const { error: insertError } = await supabase
                .from('appointments')
                .insert({
                    professionalId: professional.id,
                    startTime: selectedSlot.start.toISOString(),
                    endTime: selectedSlot.end.toISOString(),
                    title: `Appointment with ${professional.full_name}`,
                })

            if (insertError) throw new Error(insertError.message)

            setStep('success')
        } catch (err) {
            console.error('Failed to book appointment:', err)
            setError('Failed to book appointment. Please try again.')
        } finally {
            setSubmitLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Loading booking details...
                    </p>
                </div>
            </div>
        )
    }

    if (error || !professional) {
        return (
            <div className="mx-auto max-w-2xl p-6">
                <Alert variant="error">{error || 'Professional not found'}</Alert>
                <Button className="mt-4" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        )
    }

    if (step === 'success') {
        return (
            <div className="mx-auto max-w-2xl text-center p-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-3xl">
                    🎉
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Booking Request Sent!
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Your appointment request with {professional.full_name} has been submitted.
                    You will receive a notification once it is confirmed.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={() => router.push('/dashboard/appointments')}>
                        View My Appointments
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/dashboard/professionals')}>
                        Book Another
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Book Appointment
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {step === 'calendar'
                        ? `Select a time slot for ${professional.full_name}`
                        : 'Review and confirm your booking'}
                </p>
            </div>

            {step === 'calendar' && (
                <BookingCalendar
                    availability={availability}
                    existingAppointments={appointments}
                    selectedSlot={selectedSlot}
                    onSelectSlot={handleSlotSelect}
                />
            )}

            {step === 'summary' && selectedSlot && (
                <BookingSummary
                    professional={professional}
                    slot={selectedSlot}
                    onConfirm={handleConfirm}
                    onBack={() => setStep('calendar')}
                    loading={submitLoading}
                />
            )}
        </div>
    )
}
