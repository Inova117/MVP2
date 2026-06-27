'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthMeterProps {
    password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
    const strength = useMemo(() => {
        if (!password) return { score: 0, label: '', color: '' }

        let score = 0
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password),
        }

        if (checks.length) score++
        if (checks.uppercase) score++
        if (checks.lowercase) score++
        if (checks.number) score++
        if (checks.special) score++

        if (score <= 2) {
            return { score, label: 'Débil', color: 'bg-error-500' }
        } else if (score <= 4) {
            return { score, label: 'Media', color: 'bg-warning-500' }
        } else {
            return { score, label: 'Fuerte', color: 'bg-success-500' }
        }
    }, [password])

    if (!password) return null

    const criteria = [
        { ok: password.length >= 8, label: 'Al menos 8 caracteres' },
        { ok: /[A-Z]/.test(password), label: 'Una letra mayúscula' },
        { ok: /[a-z]/.test(password), label: 'Una letra minúscula' },
        { ok: /[0-9]/.test(password), label: 'Un número' },
        { ok: /[^A-Za-z0-9]/.test(password), label: 'Un símbolo (opcional)' },
    ]

    return (
        <div className="mt-2">
            <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-ink-500">
                    Seguridad de la contraseña:
                </span>
                <span
                    className={cn(
                        'text-xs font-semibold',
                        strength.score <= 2 && 'text-error-600',
                        strength.score > 2 && strength.score <= 4 && 'text-warning-600',
                        strength.score > 4 && 'text-success-600'
                    )}
                >
                    {strength.label}
                </span>
            </div>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                        key={bar}
                        className={cn(
                            'h-1.5 flex-1 rounded-full transition-all duration-300',
                            bar <= strength.score ? strength.color : 'bg-cream-300'
                        )}
                    />
                ))}
            </div>
            <div className="mt-2 space-y-1 text-xs text-ink-500">
                {criteria.map((c) => (
                    <div
                        key={c.label}
                        className={cn(c.ok && 'text-success-600')}
                    >
                        {c.ok ? '✓' : '○'} {c.label}
                    </div>
                ))}
            </div>
        </div>
    )
}
