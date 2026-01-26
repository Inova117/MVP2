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
        { id: 'pending' as const, label: 'Pending', count: counts.pending },
        { id: 'upcoming' as const, label: 'Upcoming', count: counts.upcoming },
        { id: 'past' as const, label: 'Past', count: counts.past },
    ]

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            'flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors',
                            activeTab === tab.id
                                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        )}
                    >
                        {tab.label}
                        {tab.count > 0 && (
                            <span
                                className={cn(
                                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                                    activeTab === tab.id
                                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
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
