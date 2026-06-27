'use client'

import { useState, useMemo } from 'react'
import { format, addDays, isSameDay, parse, addMinutes } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { AvailabilitySetting, Appointment } from '@/lib/mock-db/types'

interface BookingCalendarProps {
    availability: AvailabilitySetting[]
    existingAppointments: Appointment[]
    onSelectSlot: (start: Date, end: Date) => void
    selectedSlot: { start: Date; end: Date } | null
}

export function BookingCalendar({
    availability,
    existingAppointments,
    onSelectSlot,
    selectedSlot,
}: BookingCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // Próximos 14 días
    const dates = useMemo(() => {
        return Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i))
    }, [])

    // Calcular horarios disponibles para la fecha seleccionada
    const slots = useMemo(() => {
        const dayOfWeek = selectedDate.getDay() // 0 = Domingo
        const setting = availability.find((a) => a.day_of_week === dayOfWeek)

        if (!setting) return []

        const result: { start: Date; end: Date }[] = []
        const start = parse(setting.start_time, 'HH:mm', selectedDate)
        const end = parse(setting.end_time, 'HH:mm', selectedDate)
        const duration = setting.appointment_duration

        let current = start
        while (addMinutes(current, duration) <= end) {
            const slotEnd = addMinutes(current, duration)

            if (current < new Date()) {
                current = slotEnd
                continue
            }

            const hasConflict = existingAppointments.some((apt) => {
                if (apt.status === 'cancelled') return false
                const aptStart = new Date(apt.start_time)
                const aptEnd = new Date(apt.end_time)
                return current < aptEnd && slotEnd > aptStart
            })

            if (!hasConflict) {
                result.push({ start: current, end: slotEnd })
            }

            current = slotEnd
        }

        return result
    }, [selectedDate, availability, existingAppointments])

    return (
        <div className="space-y-6">
            {/* Selector de fecha */}
            <div>
                <h3 className="mb-3 font-serif text-lg font-bold text-ink-900">
                    Elige un día
                </h3>
                <div className="custom-scrollbar flex gap-2 overflow-x-auto pb-3">
                    {dates.map((date) => {
                        const active = isSameDay(date, selectedDate)
                        return (
                            <button
                                key={date.toISOString()}
                                onClick={() => setSelectedDate(date)}
                                className={cn(
                                    'flex min-w-[72px] flex-col items-center justify-center rounded-xl border p-3 transition-all',
                                    active
                                        ? 'border-sage-600 bg-sage-600 text-cream-50 shadow-tactile-sm'
                                        : 'border-cream-200 bg-cream-100 text-ink-600 hover:border-sage-300 hover:bg-sage-50'
                                )}
                            >
                                <span className="text-[11px] font-semibold uppercase tracking-wide">
                                    {format(date, 'EEE', { locale: es })}
                                </span>
                                <span className="mt-0.5 text-xl font-bold">
                                    {format(date, 'd')}
                                </span>
                                <span className="text-[10px] uppercase">
                                    {format(date, 'MMM', { locale: es })}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Horarios */}
            <div>
                <h3 className="mb-3 font-serif text-lg font-bold text-ink-900">
                    Horarios disponibles
                </h3>

                {slots.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-cream-300 bg-cream-100/60 p-10 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream-200 text-ink-400">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.7}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="mt-3 text-sm text-ink-500">
                            No hay horarios disponibles para este día.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
                        {slots.map((slot, i) => {
                            const active =
                                selectedSlot?.start.getTime() === slot.start.getTime()
                            return (
                                <button
                                    key={i}
                                    onClick={() => onSelectSlot(slot.start, slot.end)}
                                    className={cn(
                                        'rounded-xl border py-2.5 text-sm font-semibold transition-all',
                                        active
                                            ? 'border-sage-600 bg-sage-600 text-cream-50 shadow-tactile-sm'
                                            : 'border-cream-300 bg-cream-50 text-ink-700 hover:border-sage-400 hover:bg-sage-50 hover:text-sage-700'
                                    )}
                                >
                                    {format(slot.start, 'HH:mm')}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
