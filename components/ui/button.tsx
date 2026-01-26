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
                    'inline-flex items-center justify-center rounded-lg font-semibold',
                    'transition-all duration-200 ease-in-out',
                    'focus:outline-none focus:ring-4',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
                    // Variants
                    {
                        'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-100 dark:focus:ring-primary-900/30':
                            variant === 'primary',
                        'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-100 dark:focus:ring-secondary-900/30':
                            variant === 'secondary',
                        'border-2 border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-100 dark:focus:ring-gray-800':
                            variant === 'outline',
                        'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-100 dark:focus:ring-gray-800':
                            variant === 'ghost',
                    },
                    // Sizes
                    {
                        'h-9 px-4 py-2 text-sm': size === 'sm',
                        'h-12 px-6 py-3 text-base': size === 'md',
                        'h-14 px-8 py-4 text-lg': size === 'lg',
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
