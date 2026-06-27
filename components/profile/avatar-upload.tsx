'use client'

import { useState } from 'react'
import { cn, getInitials } from '@/lib/utils'

interface AvatarUploadProps {
    currentUrl?: string
    userName: string
}

export function AvatarUpload({ currentUrl, userName }: AvatarUploadProps) {
    const initials = getInitials(userName)
    const [showHint, setShowHint] = useState(false)

    return (
        <div className="flex items-center gap-6">
            <div className="relative">
                {currentUrl ? (
                    <img
                        src={currentUrl}
                        alt={userName}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-cream-100"
                    />
                ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sage-600 text-2xl font-bold text-cream-50 ring-4 ring-cream-100">
                        {initials}
                    </div>
                )}
                <div className="absolute bottom-0 right-0 rounded-full bg-cream-50 p-1 shadow-lg">
                    <svg
                        className="h-5 w-5 text-ink-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>
            </div>
            <div>
                <button
                    type="button"
                    className={cn(
                        'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                        'bg-cream-100 text-ink-700 hover:bg-cream-200'
                    )}
                    onClick={() => setShowHint(true)}
                >
                    Cambiar foto
                </button>
                <p className="mt-2 text-xs text-ink-500">
                    JPG, PNG o GIF. Máx. 2 MB.
                </p>
                {showHint && (
                    <p className="mt-1 text-xs text-ink-400">
                        La carga de fotos estará disponible próximamente.
                    </p>
                )}
            </div>
        </div>
    )
}
