'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { BookingCalendar } from '@/components/booking/booking-calendar'
import { BookingSummary } from '@/components/booking/booking-summary'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
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
                setError('No se encontró el profesional')
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
                    title: `Cita con ${professional.full_name}`,
                })

            if (insertError) throw new Error(insertError.message)

            setStep('success')
        } catch (err) {
            console.error('Failed to book appointment:', err)
            setError('No se pudo reservar la cita. Inténtalo de nuevo.')
        } finally {
            setSubmitLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-16">
                <Spinner label="Cargando los detalles de la reserva…" />
            </div>
        )
    }

    if (error || !professional) {
        return (
            <div className="mx-auto max-w-2xl p-6">
                <Alert variant="error">
                    {error || 'No se encontró el profesional'}
                </Alert>
                <Button className="mt-4" onClick={() => router.back()}>
                    Volver
                </Button>
            </div>
        )
    }

    if (step === 'success') {
        return (
            <div className="mx-auto max-w-2xl p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-100 text-success-700">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold text-ink-900">
                    ¡Solicitud de reserva enviada!
                </h2>
                <p className="mx-auto mt-3 max-w-md text-ink-600">
                    Tu solicitud de cita con {professional.full_name} fue enviada.
                    Recibirás una notificación en cuanto sea confirmada.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button onClick={() => router.push('/dashboard/appointments')}>
                        Ver mis citas
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/dashboard/professionals')}
                    >
                        Reservar otra
                    </Button>
                </div>
            </div>
        )
    }

    const stepIndex = step === 'calendar' ? 0 : 1

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div>
                <button
                    onClick={() =>
                        step === 'summary' ? setStep('calendar') : router.back()
                    }
                    className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-sage-700"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver
                </button>
                <h1 className="text-3xl font-bold text-ink-900">Reservar cita</h1>
                <p className="mt-2 text-ink-600">
                    {step === 'calendar'
                        ? `Elige un horario con ${professional.full_name}`
                        : 'Revisa y confirma tu reserva'}
                </p>

                {/* Indicador de pasos */}
                <div className="mt-5 flex items-center gap-3">
                    {['Elegir horario', 'Confirmar'].map((label, i) => (
                        <div key={label} className="flex items-center gap-3">
                            <span
                                className={
                                    'flex items-center gap-2 text-sm font-medium ' +
                                    (i <= stepIndex ? 'text-sage-700' : 'text-ink-400')
                                }
                            >
                                <span
                                    className={
                                        'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ' +
                                        (i <= stepIndex
                                            ? 'bg-sage-600 text-cream-50'
                                            : 'bg-cream-200 text-ink-400')
                                    }
                                >
                                    {i + 1}
                                </span>
                                {label}
                            </span>
                            {i === 0 && (
                                <span className="h-px w-8 bg-cream-300" aria-hidden />
                            )}
                        </div>
                    ))}
                </div>
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
