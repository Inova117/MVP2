import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface TimeSlot {
    id: string
    start_time: string
    end_time: string
}

interface TimeSlotEditorProps {
    slot: TimeSlot
    onUpdate: (id: string, data: { start_time: string; end_time: string }) => void
    onDelete: (id: string) => void
}

export function TimeSlotEditor({ slot, onUpdate, onDelete }: TimeSlotEditorProps) {
    return (
        <div className="flex items-end gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
            <div className="flex-1">
                <Label htmlFor={`start-${slot.id}`}>Start Time</Label>
                <input
                    id={`start-${slot.id}`}
                    type="time"
                    value={slot.start_time}
                    onChange={(e) => onUpdate(slot.id, { ...slot, start_time: e.target.value })}
                    className="flex h-10 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30"
                />
            </div>

            <div className="flex-1">
                <Label htmlFor={`end-${slot.id}`}>End Time</Label>
                <input
                    id={`end-${slot.id}`}
                    type="time"
                    value={slot.end_time}
                    onChange={(e) => onUpdate(slot.id, { ...slot, end_time: e.target.value })}
                    className="flex h-10 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 text-sm text-gray-900 dark:text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30"
                />
            </div>

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onDelete(slot.id)}
                className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </Button>
        </div>
    )
}
