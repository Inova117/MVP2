import { Button } from '@/components/ui/button'

interface ClientAppointmentActionsProps {
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    onCancel: () => void
    loading?: boolean
}

export function ClientAppointmentActions({
    status,
    onCancel,
    loading = false,
}: ClientAppointmentActionsProps) {
    if (status === 'completed' || status === 'cancelled') {
        return null
    }

    return (
        <div className="flex gap-2 justify-end mt-2">
            <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                loading={loading}
                className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
            >
                Cancel Appointment
            </Button>
        </div>
    )
}
