import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            loading = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center font-serif font-medium tracking-wide',
                    'transition-all duration-300 ease-out',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2',
                    'disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-y-0',
                    // Tactile Interaction
                    'hover:-translate-y-0.5 active:translate-y-0',
                    'hover:shadow-tactile-md active:shadow-tactile-sm',
                    // Shape
                    'rounded-full',
                    // Variants
                    {
                        // Primary: Salvia sólida (contraste AA con texto blanco)
                        'bg-sage-600 text-white shadow-tactile-sm hover:bg-sage-700 focus:ring-sage-300':
                            variant === 'primary',
                        // Secondary: Arcilla cálida
                        'bg-clay-500 text-white shadow-tactile-sm hover:bg-clay-600 focus:ring-clay-300':
                            variant === 'secondary',
                        // Outline: Borde sutil, transparente
                        'border-2 border-sage-300 bg-transparent text-sage-700 hover:bg-sage-50 hover:border-sage-400 focus:ring-sage-200':
                            variant === 'outline',
                        // Ghost: Mínimo
                        'bg-transparent text-ink-700 hover:bg-cream-200 hover:text-ink-900 focus:ring-cream-200':
                            variant === 'ghost',
                    },
                    // Sizes
                    {
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-11 px-6 text-[0.95rem]': size === 'md',
                        'h-14 px-9 text-lg': size === 'lg',
                    },
                    className
                )}
                disabled={disabled || loading}
                ref={ref}
                {...props}
            >
                {loading && (
                    <svg
                        className="mr-2 h-4 w-4 animate-spin text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {children}
            </button>
        )
    }
)
Button.displayName = 'Button'

export { Button }
