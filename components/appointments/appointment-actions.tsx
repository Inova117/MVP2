import { Button } from '@/components/ui/button'

interface AppointmentActionsProps {
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
    onConfirm?: () => void
    onReject?: () => void
    onComplete?: () => void
    loading?: boolean
}

export function AppointmentActions({
    status,
    onConfirm,
    onReject,
    onComplete,
    loading,
}: AppointmentActionsProps) {
    if (status === 'pending') {
        return (
            <div className="flex gap-2">
                {onConfirm && (
                    <Button size="sm" onClick={onConfirm} loading={loading}>
                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Confirm
                    </Button>
                )}
                {onReject && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onReject}
                        className="text-error-600 hover:text-error-700 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20"
                        disabled={loading}
                    >
                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                    </Button>
                )}
            </div>
        )
    }

    if (status === 'confirmed' && onComplete) {
        return (
            <Button size="sm" variant="outline" onClick={onComplete} disabled={loading}>
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mark as Completed
            </Button>
        )
    }

    return null
}
