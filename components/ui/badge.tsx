import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?:
        | 'sage'
        | 'clay'
        | 'neutral'
        | 'success'
        | 'warning'
        | 'error'
        | 'info'
    dot?: boolean
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
    sage: 'bg-sage-100 text-sage-800',
    clay: 'bg-clay-100 text-clay-800',
    neutral: 'bg-cream-200 text-ink-700',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    info: 'bg-info-100 text-info-800',
}

const dotColors: Record<NonNullable<BadgeProps['variant']>, string> = {
    sage: 'bg-sage-500',
    clay: 'bg-clay-500',
    neutral: 'bg-ink-400',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
    info: 'bg-info-500',
}

export function Badge({
    className,
    variant = 'neutral',
    dot = false,
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide',
                variants[variant],
                className
            )}
            {...props}
        >
            {dot && (
                <span
                    className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])}
                />
            )}
            {children}
        </span>
    )
}
