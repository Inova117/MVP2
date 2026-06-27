'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
    name: string
    href: string
    icon: React.ReactNode
    roles?: ('client' | 'professional')[]
}

interface SidebarProps {
    userRole: 'client' | 'professional'
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ userRole, isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    const navItems: NavItem[] = [
        {
            name: 'Inicio',
            href: '/dashboard',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            name: 'Mis citas',
            href: '/dashboard/appointments',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            name: 'Buscar profesionales',
            href: '/dashboard/professionals',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            roles: ['client'],
        },
        {
            name: 'Disponibilidad',
            href: '/dashboard/availability',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            roles: ['professional'],
        },
        {
            name: 'Mi perfil',
            href: '/dashboard/profile',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            name: 'Arquitectura',
            href: '/backend',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
    ]

    const filteredNavItems = navItems.filter(
        (item) => !item.roles || item.roles.includes(userRole)
    )

    return (
        <>
            {/* Overlay móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Barra lateral */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-64 transform border-r border-cream-200 bg-cream-100 transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between border-b border-cream-200 px-5">
                        <Link href="/dashboard" className="group flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-cream-50 shadow-tactile-sm transition-transform group-hover:-rotate-6">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 2c1 2.5 1.5 5 .5 9-1 4-4 7-8.5 7H11z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 22c4-3 6.5-6 9-12" />
                                </svg>
                            </span>
                            <span className="font-serif text-lg font-bold tracking-tight text-ink-900">
                                Agenda
                            </span>
                        </Link>
                        <button
                            onClick={onClose}
                            aria-label="Cerrar menú"
                            className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-cream-200 lg:hidden"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navegación */}
                    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                        {filteredNavItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? 'bg-sage-600 text-cream-50 shadow-tactile-sm'
                                            : 'text-ink-600 hover:bg-cream-200 hover:text-ink-900'
                                    )}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Pie */}
                    <div className="border-t border-cream-200 p-4">
                        <div className="rounded-xl bg-sage-50 p-3.5">
                            <p className="text-xs font-semibold text-ink-900">
                                {userRole === 'professional'
                                    ? 'Cuenta profesional'
                                    : 'Cuenta de cliente'}
                            </p>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                                <svg className="h-3.5 w-3.5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.6-2.6A11.96 11.96 0 0112 21.8 11.96 11.96 0 013.4 7.4 12 12 0 0012 2.9a12 12 0 008.6 4.5z" />
                                </svg>
                                Seguridad de nivel empresarial
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
