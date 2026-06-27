import { cn } from '@/lib/utils'

export interface SpinnerProps {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    label?: string
}

const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
}

export function Spinner({ className, size = 'md', label }: SpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                role="status"
                aria-label={label ?? 'Cargando'}
                className={cn(
                    'inline-block animate-spin rounded-full border-solid border-sage-500 border-r-transparent',
                    sizes[size],
                    className
                )}
            />
            {label && <p className="text-sm text-ink-500">{label}</p>}
        </div>
    )
}
