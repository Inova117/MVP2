'use client'

import { cn } from '@/lib/utils'

interface RoleSelectorProps {
    value: 'client' | 'professional'
    onChange: (role: 'client' | 'professional') => void
}

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <button
                type="button"
                onClick={() => onChange('client')}
                className={cn(
                    'group relative overflow-hidden rounded-lg border-2 p-6 transition-all duration-200',
                    'hover:shadow-lg hover:-translate-y-1',
                    value === 'client'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                )}
            >
                <div className="flex flex-col items-center text-center">
                    <div
                        className={cn(
                            'mb-3 rounded-full p-3 transition-colors',
                            value === 'client'
                                ? 'bg-primary-100 dark:bg-primary-900/40'
                                : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-50'
                        )}
                    >
                        <svg
                            className={cn(
                                'h-8 w-8',
                                value === 'client'
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-400'
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <h3
                        className={cn(
                            'font-semibold',
                            value === 'client'
                                ? 'text-primary-900 dark:text-primary-100'
                                : 'text-gray-900 dark:text-gray-100'
                        )}
                    >
                        Client
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Book appointments with professionals
                    </p>
                </div>
                {value === 'client' && (
                    <div className="absolute right-2 top-2">
                        <div className="rounded-full bg-primary-500 p-1">
                            <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </button>

            <button
                type="button"
                onClick={() => onChange('professional')}
                className={cn(
                    'group relative overflow-hidden rounded-lg border-2 p-6 transition-all duration-200',
                    'hover:shadow-lg hover:-translate-y-1',
                    value === 'professional'
                        ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-secondary-300'
                )}
            >
                <div className="flex flex-col items-center text-center">
                    <div
                        className={cn(
                            'mb-3 rounded-full p-3 transition-colors',
                            value === 'professional'
                                ? 'bg-secondary-100 dark:bg-secondary-900/40'
                                : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-secondary-50'
                        )}
                    >
                        <svg
                            className={cn(
                                'h-8 w-8',
                                value === 'professional'
                                    ? 'text-secondary-600 dark:text-secondary-400'
                                    : 'text-gray-600 dark:text-gray-400'
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3
                        className={cn(
                            'font-semibold',
                            value === 'professional'
                                ? 'text-secondary-900 dark:text-secondary-100'
                                : 'text-gray-900 dark:text-gray-100'
                        )}
                    >
                        Professional
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Offer services and manage appointments
                    </p>
                </div>
                {value === 'professional' && (
                    <div className="absolute right-2 top-2">
                        <div className="rounded-full bg-secondary-500 p-1">
                            <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </button>
        </div>
    )
}
