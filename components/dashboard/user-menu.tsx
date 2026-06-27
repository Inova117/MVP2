'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { cn, getInitials } from '@/lib/utils'

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

    const initials = getInitials(user.full_name)
    const roleLabel = user.role === 'professional' ? 'Profesional' : 'Cliente'

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-cream-200"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 text-sm font-semibold text-cream-50">
                    {initials}
                </div>
                <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-ink-900">
                        {user.full_name}
                    </p>
                    <p className="text-xs text-ink-500">{roleLabel}</p>
                </div>
                <svg
                    className={cn(
                        'h-4 w-4 text-ink-400 transition-transform',
                        isOpen && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-cream-200 bg-cream-50 shadow-tactile-lg">
                        <div className="border-b border-cream-200 bg-cream-100 px-4 py-3">
                            <p className="text-sm font-medium text-ink-900">
                                {user.full_name}
                            </p>
                            <p className="truncate text-xs text-ink-500">
                                {user.email}
                            </p>
                        </div>
                        <div className="p-2">
                            <button
                                onClick={() => {
                                    setIsOpen(false)
                                    router.push('/dashboard/profile')
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-cream-200"
                            >
                                <svg className="h-4 w-4 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Mi perfil
                            </button>
                        </div>
                        <div className="border-t border-cream-200 p-2">
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-error-600 transition-colors hover:bg-error-50 disabled:opacity-50"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {loading ? 'Cerrando sesión…' : 'Cerrar sesión'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
