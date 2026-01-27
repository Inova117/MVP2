import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div className="w-full group">
                <input
                    type={type}
                    className={cn(
                        // Base
                        'flex h-12 w-full bg-transparent px-1 py-3 text-base font-sans text-ink-900',
                        // Border - Underline style
                        'border-b-2 border-cream-400',
                        'rounded-t-md', // Slight rounding on top
                        // Transition
                        'transition-all duration-300 ease-out',
                        'placeholder:text-cream-500 placeholder:font-serif placeholder:italic',
                        // Focus
                        'focus:outline-none focus:border-sage-400 focus:bg-cream-100/50',
                        // Hover
                        'hover:border-cream-600',
                        // Disabled
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        // Error
                        error
                            ? 'border-error-soft text-error-text placeholder:text-error-soft/70 focus:border-error-text'
                            : '',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-error-text font-medium" role="alert">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
