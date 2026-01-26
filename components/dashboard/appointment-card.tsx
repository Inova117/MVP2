import { cn, formatDate, formatTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
        pending: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300',
        confirmed: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
        cancelled: 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300',
        completed: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    }

    const otherParty = userRole === 'client' ? appointment.professional : appointment.client

    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {appointment.title}
                        </h3>
                        <span
                            className={cn(
                                'rounded-full px-2 py-0.5 text-xs font-medium',
                                statusColors[appointment.status]
                            )}
                        >
                            {appointment.status}
                        </span>
                    </div>
                    {appointment.description && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {appointment.description}
                        </p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
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
                        <div className="flex items-center gap-1">
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
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-xs font-semibold text-white">
                                {otherParty.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {otherParty.full_name}
                                </p>
                                {userRole === 'client' && appointment.professional?.specialty && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {appointment.professional.specialty}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {appointment.status === 'pending' && onAction && (
                <div className="mt-4 flex gap-2">
                    {userRole === 'professional' && (
                        <>
                            <Button
                                size="sm"
                                onClick={() => onAction(appointment.id, 'confirm')}
                            >
                                Confirm
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onAction(appointment.id, 'reject')}
                            >
                                Reject
                            </Button>
                        </>
                    )}
                    {userRole === 'client' && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onAction(appointment.id, 'cancel')}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}
