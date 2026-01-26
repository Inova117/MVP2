import { cn } from '@/lib/utils'

interface StatCardProps {
    label: string
    value: string | number
    icon: React.ReactNode
    trend?: {
        value: number
        isPositive: boolean
    }
    color?: 'primary' | 'secondary' | 'success' | 'warning'
}

export function StatCard({
    label,
    value,
    icon,
    trend,
    color = 'primary',
}: StatCardProps) {
    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </p>
                    {trend && (
                        <div className="mt-2 flex items-center gap-1">
                            <svg
                                className={cn(
                                    'h-4 w-4',
                                    trend.isPositive ? 'text-success-500' : 'text-error-500',
                                    !trend.isPositive && 'rotate-180'
                                )}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                />
                            </svg>
                            <span
                                className={cn(
                                    'text-sm font-medium',
                                    trend.isPositive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
                                )}
                            >
                                {trend.value}%
                            </span>
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        'rounded-full p-3',
                        color === 'primary' && 'bg-primary-100 dark:bg-primary-900/30',
                        color === 'secondary' && 'bg-secondary-100 dark:bg-secondary-900/30',
                        color === 'success' && 'bg-success-100 dark:bg-success-900/30',
                        color === 'warning' && 'bg-warning-100 dark:bg-warning-900/30'
                    )}
                >
                    <div
                        className={cn(
                            'h-8 w-8',
                            color === 'primary' && 'text-primary-600 dark:text-primary-400',
                            color === 'secondary' && 'text-secondary-600 dark:text-secondary-400',
                            color === 'success' && 'text-success-600 dark:text-success-400',
                            color === 'warning' && 'text-warning-600 dark:text-warning-400'
                        )}
                    >
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    )
}
