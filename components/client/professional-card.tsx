import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getInitials, formatCurrency } from '@/lib/utils'
import type { Profile } from '@/lib/mock-db/types'

interface ProfessionalCardProps {
    professional: Profile
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
    const initials = getInitials(professional.full_name)

    return (
        <div className="flex flex-col rounded-2xl border border-cream-200 bg-cream-100 p-6 shadow-tactile-sm transition-all hover:-translate-y-1 hover:shadow-tactile-lg">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-600 text-lg font-bold text-cream-50">
                        {initials}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-ink-900">
                            {professional.full_name}
                        </h3>
                        <Badge variant="sage" className="mt-1">
                            {professional.specialty || 'Profesional'}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex-1">
                <p className="text-sm text-ink-600 line-clamp-3">
                    {professional.bio || 'Este profesional aún no agregó una descripción.'}
                </p>
            </div>

            <div className="mt-6 border-t border-cream-200 pt-4">
                <div className="mb-4">
                    <p className="text-xs text-ink-500">Tarifa por hora</p>
                    <p className="text-lg font-bold text-ink-900">
                        {formatCurrency(professional.hourly_rate ?? 0)}
                    </p>
                </div>
                <Link href={`/dashboard/book/${professional.id}`} className="block">
                    <Button variant="primary" className="w-full">
                        Reservar
                    </Button>
                </Link>
            </div>
        </div>
    )
}
