import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** `elevated` añade sombra táctil; `flat` solo borde. */
    variant?: 'elevated' | 'flat'
    /** Activa el realce sutil al pasar el cursor. */
    interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'elevated', interactive = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-2xl bg-cream-100 border border-cream-200/80',
                    variant === 'elevated' && 'shadow-tactile-sm',
                    interactive &&
                        'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-tactile-lg hover:border-sage-200',
                    className
                )}
                {...props}
            />
        )
    }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-0', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('font-serif text-lg font-bold text-ink-900', className)}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardTitle, CardContent }
