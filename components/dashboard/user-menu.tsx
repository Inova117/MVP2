'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

interface UserMenuProps {
    user: {
        email: string
        full_name: string
        role: 'client' | 'professional'
    }
}

export function UserMenu({ user }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { signOut, loading } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        await signOut()
    }

    const initials = user.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-semibold text-white">
                    {initials}
                </div>
                <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.full_name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {user.role}
                    </p>
                </div>
                <svg
                    className={cn(
                        'h-4 w-4 text-gray-500 transition-transform',
                        isOpen && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.full_name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {user.email}
                            </p>
                        </div>
                        <div className="p-2">
                            <button
                                onClick={() => {
                                    setIsOpen(false)
                                    router.push('/dashboard/profile')
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <svg
                                    className="h-4 w-4"
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
                                My Profile
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false)
                                    router.push('/dashboard/settings')
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                Settings
                            </button>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors disabled:opacity-50"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                {loading ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
