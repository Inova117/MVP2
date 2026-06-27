// Floating Button to Access Backend Documentation
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BackendFloatButton() {
    const pathname = usePathname()

    // Don't show on backend page itself
    if (pathname === '/backend') return null

    return (
        <Link
            href="/backend"
            className="group fixed bottom-6 right-6 z-50"
            title="Ver arquitectura y seguridad"
        >
            <div className="relative" suppressHydrationWarning>
                {/* Botón principal */}
                <div className="flex items-center gap-2 rounded-full bg-sage-600 px-5 py-3 text-cream-50 shadow-tactile-floating transition-all duration-300 group-hover:scale-105 group-hover:bg-sage-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="hidden font-semibold sm:inline">Arquitectura</span>
                    <span className="font-semibold sm:hidden">Code</span>
                </div>

                {/* Pulso */}
                <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-sage-500 opacity-20" />
            </div>

            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-ink-900 px-3 py-2 text-sm text-cream-50 opacity-0 transition-opacity group-hover:opacity-100">
                Ver arquitectura y seguridad
                <div className="absolute right-4 top-full -mt-1 border-4 border-transparent border-t-ink-900" />
            </div>
        </Link>
    )
}
