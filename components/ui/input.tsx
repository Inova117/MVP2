import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type}
                    className={cn(
                        'flex h-12 w-full rounded-lg border-2 bg-white px-4 py-3 text-sm',
                        'transition-all duration-200 ease-in-out',
                        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                        'focus:outline-none focus:ring-4 focus:scale-[1.02]',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'dark:bg-gray-800 dark:text-white',
                        error
                            ? 'border-error-500 focus:border-error-500 focus:ring-error-100 dark:focus:ring-error-900/30'
                            : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-100 dark:focus:ring-primary-900/30',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-error-600 dark:text-error-400" role="alert">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
