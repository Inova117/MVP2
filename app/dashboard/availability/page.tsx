'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { DayScheduleEditor } from '@/components/availability/day-schedule-editor'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import type { AvailabilitySetting, Session } from '@/lib/mock-db/types'

const DAYS = [
    { name: 'Domingo', number: 0 },
    { name: 'Lunes', number: 1 },
    { name: 'Martes', number: 2 },
    { name: 'Miércoles', number: 3 },
    { name: 'Jueves', number: 4 },
    { name: 'Viernes', number: 5 },
    { name: 'Sábado', number: 6 },
]

const DURATIONS = [30, 60, 90, 120] as const

interface TimeSlot {
    id: string
    day_of_week: number
    start_time: string
    end_time: string
}

export default function AvailabilityPage() {
    const [user, setUser] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [duration, setDuration] = useState<30 | 60 | 90 | 120>(60)
    const [slots, setSlots] = useState<TimeSlot[]>([])
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: sessionData } = await supabase.auth.getSession()
            if (!sessionData.session) {
                router.push('/login')
                return
            }

            // Check if professional
            if (sessionData.session.role !== 'professional') {
                router.push('/dashboard')
                return
            }

            setUser(sessionData.session)

            // Fetch availability slots
            const { data: availabilityData } = await supabase
                .from('availability')
                .select('*')
                .eq('professional_id', sessionData.session.user_id)
                .execute()

            const data = (availabilityData as { data?: AvailabilitySetting[] })?.data
            if (data) {
                setSlots(data)
                // Set duration from first slot if exists
                if (data.length > 0 && data[0]) {
                    setDuration(data[0].appointment_duration || 60)
                }
            }

            setLoading(false)
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run once on mount

    const handleAddSlot = (dayNumber: number) => {
        const newSlot: TimeSlot = {
            id: `temp-${Date.now()}`,
            day_of_week: dayNumber,
            start_time: '09:00',
            end_time: '17:00',
        }
        setSlots([...slots, newSlot])
    }

    const handleUpdateSlot = (id: string, data: { start_time: string; end_time: string }) => {
        setSlots(slots.map((slot) => (slot.id === id ? { ...slot, ...data } : slot)))
    }

    const handleDeleteSlot = (id: string) => {
        setSlots(slots.filter((slot) => slot.id !== id))
    }

    const handleSave = async () => {
        if (!user) return // Guard clause

        try {
            setSaving(true)
            setError(null)

            // Delete all existing slots
            await supabase
                .from('availability')
                .eq('professional_id', user.user_id)
                .delete()

            // Insert new slots with duration
            if (slots.length > 0) {
                const slotsToInsert = slots.map((slot) => ({
                    professional_id: user.user_id,
                    day_of_week: slot.day_of_week,
                    start_time: slot.start_time,
                    end_time: slot.end_time,
                    appointment_duration: duration,
                }))

                await supabase.from('availability').insert(slotsToInsert)
            }

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo guardar la disponibilidad')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sage-500 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-ink-600">
                        Cargando…
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-ink-900">
                    Disponibilidad
                </h1>
                <p className="mt-2 text-ink-600">
                    Configura tu disponibilidad semanal
                </p>
            </div>

            {success && (
                <Alert variant="success">Guardado correctamente</Alert>
            )}

            {error && <Alert variant="error">{error}</Alert>}

            {/* Appointment Duration */}
            <div className="rounded-2xl border border-cream-200 bg-cream-100 p-6">
                <Label htmlFor="duration">Duración de la cita</Label>
                <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value) as 30 | 60 | 90 | 120)}
                    className="mt-2 flex h-12 w-full max-w-xs rounded-lg border-2 border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
                >
                    {DURATIONS.map((d) => (
                        <option key={d} value={d}>
                            {d} minutos
                        </option>
                    ))}
                </select>
            </div>

            {/* Weekly Schedule */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-ink-900">
                    Horario semanal
                </h2>
                {DAYS.map((day) => (
                    <DayScheduleEditor
                        key={day.number}
                        dayName={day.name}
                        dayNumber={day.number}
                        slots={slots.filter((slot) => slot.day_of_week === day.number)}
                        onAddSlot={handleAddSlot}
                        onUpdateSlot={handleUpdateSlot}
                        onDeleteSlot={handleDeleteSlot}
                    />
                ))}
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 border-t border-cream-200 pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                >
                    Cancelar
                </Button>
                <Button onClick={handleSave} loading={saving}>
                    Guardar cambios
                </Button>
            </div>
        </div>
    )
}
