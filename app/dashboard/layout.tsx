'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { UserMenu } from '@/components/dashboard/user-menu'
import { Spinner } from '@/components/ui/spinner'
import { createClient } from '@/lib/supabase'

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
            <div className="flex h-screen items-center justify-center bg-cream-50">
                <Spinner size="lg" label="Cargando tu agenda…" />
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="flex h-screen bg-cream-50">
            <Sidebar
                userRole={user.role}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Barra superior */}
                <header className="flex h-16 items-center justify-between border-b border-cream-200 bg-cream-50/80 px-4 backdrop-blur-md lg:px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Abrir menú"
                        className="rounded-lg p-2 text-ink-600 transition-colors hover:bg-cream-200 lg:hidden"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex-1 lg:hidden" />

                    <div className="flex items-center gap-4">
                        <UserMenu user={user} />
                    </div>
                </header>

                {/* Contenido */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="mx-auto max-w-6xl animate-rise">{children}</div>
                </main>
            </div>
        </div>
    )
}
