import { cn } from '@/lib/utils'

type StatColor = 'sage' | 'clay' | 'success' | 'warning' | 'info'

interface StatCardProps {
    label: string
    value: string | number
    icon: React.ReactNode
    hint?: string
    color?: StatColor
}

const colorMap: Record<StatColor, { bg: string; fg: string }> = {
    sage: { bg: 'bg-sage-100', fg: 'text-sage-700' },
    clay: { bg: 'bg-clay-100', fg: 'text-clay-700' },
    success: { bg: 'bg-success-100', fg: 'text-success-700' },
    warning: { bg: 'bg-warning-100', fg: 'text-warning-700' },
    info: { bg: 'bg-info-100', fg: 'text-info-700' },
}

export function StatCard({
    label,
    value,
    icon,
    hint,
    color = 'sage',
}: StatCardProps) {
    const c = colorMap[color]
    return (
        <div className="rounded-2xl border border-cream-200/80 bg-cream-100 p-6 shadow-tactile-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-tactile-lg">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <p className="text-sm font-medium text-ink-500">{label}</p>
                    <p className="mt-2 font-serif text-3xl font-bold text-ink-900">
                        {value}
                    </p>
                    {hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>}
                </div>
                <div className={cn('rounded-xl p-3', c.bg)}>
                    <div className={cn('h-7 w-7', c.fg)}>{icon}</div>
                </div>
            </div>
        </div>
    )
}
