'use client'

import { useState, useMemo } from 'react'
import { format, addDays, isSameDay, parse, addMinutes } from 'date-fns'
import { Button } from '@/components/ui/button'
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

    // Generate next 14 days
    const dates = useMemo(() => {
        return Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i))
    }, [])

    // Calculate slots for selected date
    const slots = useMemo(() => {
        const dayOfWeek = selectedDate.getDay() // 0 = Sunday
        const setting = availability.find((a) => a.day_of_week === dayOfWeek)

        if (!setting) return []

        const slots: { start: Date; end: Date }[] = []
        const start = parse(setting.start_time, 'HH:mm', selectedDate)
        const end = parse(setting.end_time, 'HH:mm', selectedDate)
        const duration = setting.appointment_duration

        let current = start
        while (addMinutes(current, duration) <= end) {
            const slotEnd = addMinutes(current, duration)

            // Check if slot is in the past
            if (current < new Date()) {
                current = slotEnd
                continue
            }

            // Check for conflicts
            const hasConflict = existingAppointments.some((apt) => {
                if (apt.status === 'cancelled') return false

                const aptStart = new Date(apt.start_time)
                const aptEnd = new Date(apt.end_time)

                // Simple overlap check
                return current < aptEnd && slotEnd > aptStart
            })

            if (!hasConflict) {
                slots.push({ start: current, end: slotEnd })
            }

            current = slotEnd
        }

        return slots
    }, [selectedDate, availability, existingAppointments])

    return (
        <div className="space-y-6">
            {/* Date Selector */}
            <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                {dates.map((date) => (
                    <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex min-w-[80px] flex-col items-center justify-center rounded-lg border p-3 transition-colors ${isSameDay(date, selectedDate)
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary-200'
                            }`}
                    >
                        <span className="text-xs font-medium uppercase">
                            {format(date, 'EEE')}
                        </span>
                        <span className="text-xl font-bold">{format(date, 'd')}</span>
                    </button>
                ))}
            </div>

            {/* Slots Grid */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Available Time Slots
                </h3>

                {slots.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-8 text-center text-gray-500 dark:text-gray-400">
                        No available slots for this date
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {slots.map((slot, i) => (
                            <Button
                                key={i}
                                variant={
                                    selectedSlot?.start.getTime() === slot.start.getTime()
                                        ? 'primary'
                                        : 'outline'
                                }
                                className="w-full"
                                onClick={() => onSelectSlot(slot.start, slot.end)}
                            >
                                {format(slot.start, 'HH:mm')}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
