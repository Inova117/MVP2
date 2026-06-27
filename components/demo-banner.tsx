// Demo Mode Banner Component
'use client'

import Link from 'next/link'

export function DemoBanner() {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

    if (!isDemoMode) return null

    return (
        <div className="bg-ink-900 text-cream-100">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-clay-500 text-[10px] font-bold text-cream-50">
                        ✦
                    </span>
                    <span className="font-semibold">Modo demo</span>
                    <span className="hidden text-cream-300 sm:inline">
                        · datos de ejemplo realistas
                    </span>
                </div>

                <Link
                    href="/backend"
                    className="flex items-center gap-1.5 rounded-full bg-cream-50/10 px-3 py-1 font-semibold text-cream-50 ring-1 ring-cream-50/15 transition hover:bg-cream-50/20"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="hidden sm:inline">Arquitectura & seguridad</span>
                    <span className="sm:hidden">Arquitectura</span>
                </Link>
            </div>
        </div>
    )
}
