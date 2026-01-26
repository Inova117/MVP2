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
            return { score, label: 'Weak', color: 'bg-error-500' }
        } else if (score <= 4) {
            return { score, label: 'Medium', color: 'bg-warning-500' }
        } else {
            return { score, label: 'Strong', color: 'bg-success-500' }
        }
    }, [password])

    if (!password) return null

    return (
        <div className="mt-2">
            <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                    Password strength:
                </span>
                <span
                    className={cn(
                        'text-xs font-semibold',
                        strength.score <= 2 && 'text-error-600 dark:text-error-400',
                        strength.score > 2 &&
                        strength.score <= 4 &&
                        'text-warning-600 dark:text-warning-400',
                        strength.score > 4 && 'text-success-600 dark:text-success-400'
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
                            bar <= strength.score
                                ? strength.color
                                : 'bg-gray-200 dark:bg-gray-700'
                        )}
                    />
                ))}
            </div>
            <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className={cn(password.length >= 8 && 'text-success-600 dark:text-success-400')}>
                    {password.length >= 8 ? '✓' : '○'} At least 8 characters
                </div>
                <div className={cn(/[A-Z]/.test(password) && 'text-success-600 dark:text-success-400')}>
                    {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
                </div>
                <div className={cn(/[0-9]/.test(password) && 'text-success-600 dark:text-success-400')}>
                    {/[0-9]/.test(password) ? '✓' : '○'} One number
                </div>
            </div>
        </div>
    )
}
