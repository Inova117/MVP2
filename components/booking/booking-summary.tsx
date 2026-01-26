import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/lib/mock-db/types'

interface BookingSummaryProps {
    professional: Profile
    slot: { start: Date; end: Date }
    onConfirm: () => void
    onBack: () => void
    loading?: boolean
}

export function BookingSummary({
    professional,
    slot,
    onConfirm,
    onBack,
    loading = false,
}: BookingSummaryProps) {
    const duration = (slot.end.getTime() - slot.start.getTime()) / (1000 * 60)
    const price = (professional.hourly_rate || 0) * (duration / 60)

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Booking Summary
                </h3>

                <div className="mt-4 space-y-4">
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                        <span className="text-gray-600 dark:text-gray-400">Professional</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {professional.full_name}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                        <span className="text-gray-600 dark:text-gray-400">Date</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {format(slot.start, 'EEEE, MMMM d, yyyy')}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                        <span className="text-gray-600 dark:text-gray-400">Time</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
                        </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                        <span className="text-gray-600 dark:text-gray-400">Duration</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {duration} minutes
                        </span>
                    </div>

                    <div className="flex justify-between pt-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            Total Price
                        </span>
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                            ${price.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onBack}
                    disabled={loading}
                >
                    Back
                </Button>
                <Button
                    className="flex-1"
                    onClick={onConfirm}
                    loading={loading}
                >
                    Confirm Booking
                </Button>
            </div>
        </div>
    )
}
