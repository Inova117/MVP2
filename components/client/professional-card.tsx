import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/lib/mock-db/types'

interface ProfessionalCardProps {
    professional: Profile
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
    const initials = professional.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-lg font-bold text-white">
                        {initials}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {professional.full_name}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/20 px-2 py-1 text-xs font-medium text-primary-700 dark:text-primary-300">
                            {professional.specialty || 'General Professional'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {professional.bio || 'No bio available for this professional.'}
                </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hourly Rate</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${professional.hourly_rate?.toFixed(2) || '0.00'}
                    </p>
                </div>
                <Link href={`/dashboard/book/${professional.id}`}>
                    <Button variant="primary">Book Now</Button>
                </Link>
            </div>
        </div>
    )
}
