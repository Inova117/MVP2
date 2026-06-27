import { cn, formatDate, formatTime, getInitials } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const statusLabels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Completada',
} as const

interface AppointmentCardProps {
    appointment: {
        id: string
        title: string
        description?: string
        start_time: string
        end_time: string
        status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
        client?: {
            full_name: string
            email: string
        }
        professional?: {
            full_name: string
            email: string
            specialty?: string
        }
    }
    userRole: 'client' | 'professional'
    onAction?: (appointmentId: string, action: string) => void
}

export function AppointmentCard({
    appointment,
    userRole,
    onAction,
}: AppointmentCardProps) {
    const startTime = new Date(appointment.start_time)
    const endTime = new Date(appointment.end_time)

    const statusColors = {
        pending: 'bg-warning-soft text-warning-text',
        confirmed: 'bg-success-soft text-success-text',
        cancelled: 'bg-error-soft text-error-text',
        completed: 'bg-cream-300 text-ink-700',
    }

    const otherParty = userRole === 'client' ? appointment.professional : appointment.client

    return (
        <div className="group rounded-2xl bg-cream-100 p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-tactile-lg shadow-tactile-sm border border-transparent hover:border-sage-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl font-bold text-ink-900">
                            {appointment.title}
                        </h3>
                        <span
                            className={cn(
                                'rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
                                statusColors[appointment.status]
                            )}
                        >
                            {statusLabels[appointment.status]}
                        </span>
                    </div>
                    {appointment.description && (
                        <p className="mt-2 text-base text-ink-700 font-sans leading-relaxed">
                            {appointment.description}
                        </p>
                    )}
                    <div className="mt-4 flex items-center gap-6 text-sm font-medium text-ink-500">
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            {formatDate(startTime)}
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {formatTime(startTime)} - {formatTime(endTime)}
                        </div>
                    </div>
                    {otherParty && (
                        <div className="mt-4 flex items-center gap-3 border-t border-cream-200 pt-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-200 text-sage-800 text-sm font-bold shadow-tactile-sm">
                                {getInitials(otherParty.full_name)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-ink-900">
                                    {otherParty.full_name}
                                </p>
                                {userRole === 'client' && appointment.professional?.specialty && (
                                    <p className="text-xs text-ink-500 font-medium">
                                        {appointment.professional.specialty}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {appointment.status === 'pending' && onAction && (
                <div className="mt-6 flex gap-3">
                    {userRole === 'professional' && (
                        <>
                            <Button
                                size="sm"
                                onClick={() => onAction(appointment.id, 'confirm')}
                            >
                                Confirmar
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onAction(appointment.id, 'reject')}
                                className="border-error-200 text-error-700 hover:bg-error-50 hover:border-error-300"
                            >
                                Rechazar
                            </Button>
                        </>
                    )}
                    {userRole === 'client' && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onAction(appointment.id, 'cancel')}
                            className="border-error-200 text-error-700 hover:bg-error-50 hover:border-error-300"
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}
