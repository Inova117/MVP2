import { Button } from '@/components/ui/button'
import { TimeSlotEditor } from './time-slot-editor'

interface TimeSlot {
    id: string
    start_time: string
    end_time: string
}

interface DayScheduleEditorProps {
    dayName: string
    dayNumber: number
    slots: TimeSlot[]
    onAddSlot: (dayNumber: number) => void
    onUpdateSlot: (id: string, data: { start_time: string; end_time: string }) => void
    onDeleteSlot: (id: string) => void
}

export function DayScheduleEditor({
    dayName,
    dayNumber,
    slots,
    onAddSlot,
    onUpdateSlot,
    onDeleteSlot,
}: DayScheduleEditorProps) {
    return (
        <div className="rounded-2xl border border-cream-200 bg-cream-100 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-ink-900">
                    {dayName}
                </h3>
                {slots.length === 0 && (
                    <span className="text-sm text-ink-500">
                        Sin disponibilidad
                    </span>
                )}
            </div>

            <div className="space-y-3">
                {slots.map((slot) => (
                    <TimeSlotEditor
                        key={slot.id}
                        slot={slot}
                        onUpdate={onUpdateSlot}
                        onDelete={onDeleteSlot}
                    />
                ))}

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onAddSlot(dayNumber)}
                    className="w-full"
                >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar horario
                </Button>
            </div>
        </div>
    )
}
