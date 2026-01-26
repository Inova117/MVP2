'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { UserMenu } from '@/components/dashboard/user-menu'
import { createClient } from '@/lib/supabase'
import type { Session } from '@/lib/mock-db/types'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getSession()

            if (!data.session) {
                router.push('/login')
                return
            }

            setUser({
                email: data.session.email,
                full_name: data.session.profile?.full_name || data.session.email,
                role: data.session.role,
            })
            setLoading(false)
        }

        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run once on mount

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Loading...
                    </p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
            <Sidebar
                userRole={user.role}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top bar */}
                <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 lg:px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <svg
                            className="h-6 w-6 text-gray-600 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="flex-1 lg:hidden" />

                    <div className="flex items-center gap-4">
                        {/* Dark mode toggle placeholder */}
                        <button className="hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:block">
                            <svg
                                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        </button>

                        <UserMenu user={user} />
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
