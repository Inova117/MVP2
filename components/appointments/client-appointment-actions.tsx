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
                disabled={loading}
                className="border-error-200 text-error-600 hover:text-error-700 hover:bg-error-50"
            >
                Cancelar cita
            </Button>
        </div>
    )
}
