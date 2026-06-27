import { cn } from '@/lib/utils'

interface AppointmentTabsProps {
    activeTab: 'pending' | 'upcoming' | 'past'
    onTabChange: (tab: 'pending' | 'upcoming' | 'past') => void
    counts: {
        pending: number
        upcoming: number
        past: number
    }
}

export function AppointmentTabs({ activeTab, onTabChange, counts }: AppointmentTabsProps) {
    const tabs = [
        { id: 'pending' as const, label: 'Pendientes', count: counts.pending },
        { id: 'upcoming' as const, label: 'Próximas', count: counts.upcoming },
        { id: 'past' as const, label: 'Pasadas', count: counts.past },
    ]

    return (
        <div className="border-b border-cream-200">
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            'flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-300 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 rounded-sm',
                            activeTab === tab.id
                                ? 'border-sage-600 text-sage-700'
                                : 'border-transparent text-ink-500 hover:border-cream-300 hover:text-ink-700'
                        )}
                    >
                        {tab.label}
                        {tab.count > 0 && (
                            <span
                                className={cn(
                                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                                    activeTab === tab.id
                                        ? 'bg-sage-100 text-sage-700'
                                        : 'bg-cream-200 text-ink-600'
                                )}
                            >
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    )
}
