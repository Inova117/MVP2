import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { formatCurrency, getInitials } from '@/lib/utils'
import type { Profile } from '@/lib/mock-db/types'

interface BookingSummaryProps {
    professional: Profile
    slot: { start: Date; end: Date }
    onConfirm: () => void
    onBack: () => void
    loading?: boolean
}

export function BookingSummary({
    professional,
    slot,
    onConfirm,
    onBack,
    loading = false,
}: BookingSummaryProps) {
    const duration = Math.round(
        (slot.end.getTime() - slot.start.getTime()) / (1000 * 60)
    )
    const price = (professional.hourly_rate || 0) * (duration / 60)

    const rows = [
        {
            label: 'Fecha',
            value: format(slot.start, "EEEE d 'de' MMMM, yyyy", { locale: es }),
        },
        {
            label: 'Hora',
            value: `${format(slot.start, 'HH:mm')} – ${format(slot.end, 'HH:mm')}`,
        },
        { label: 'Duración', value: `${duration} minutos` },
    ]

    return (
        <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 shadow-tactile-sm">
                {/* Encabezado del profesional */}
                <div className="flex items-center gap-4 border-b border-cream-200 bg-sage-50 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-600 text-lg font-bold text-cream-50">
                        {getInitials(professional.full_name)}
                    </div>
                    <div>
                        <p className="font-serif text-lg font-bold text-ink-900">
                            {professional.full_name}
                        </p>
                        {professional.specialty && (
                            <p className="text-sm text-ink-500">
                                {professional.specialty}
                            </p>
                        )}
                    </div>
                </div>

                <div className="space-y-4 p-6">
                    {rows.map((row) => (
                        <div
                            key={row.label}
                            className="flex items-center justify-between border-b border-cream-200 pb-4 last:border-0 last:pb-0"
                        >
                            <span className="text-ink-500">{row.label}</span>
                            <span className="text-right font-medium capitalize text-ink-900">
                                {row.value}
                            </span>
                        </div>
                    ))}

                    <div className="flex items-center justify-between rounded-xl bg-sage-50 px-4 py-3">
                        <span className="font-semibold text-ink-900">Precio total</span>
                        <span className="font-serif text-2xl font-bold text-sage-700">
                            {formatCurrency(price)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onBack}
                    disabled={loading}
                >
                    Volver
                </Button>
                <Button className="flex-1" onClick={onConfirm} loading={loading}>
                    Confirmar reserva
                </Button>
            </div>
        </div>
    )
}
