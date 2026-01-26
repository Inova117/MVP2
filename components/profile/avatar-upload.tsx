import { cn } from '@/lib/utils'

interface AvatarUploadProps {
    currentUrl?: string
    userName: string
}

export function AvatarUpload({ currentUrl, userName }: AvatarUploadProps) {
    const initials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="flex items-center gap-6">
            <div className="relative">
                {currentUrl ? (
                    <img
                        src={currentUrl}
                        alt={userName}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-100 dark:ring-gray-800"
                    />
                ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-2xl font-bold text-white ring-4 ring-gray-100 dark:ring-gray-800">
                        {initials}
                    </div>
                )}
                <div className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800 p-1 shadow-lg">
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
                        'bg-gray-100 text-gray-700 hover:bg-gray-200',
                        'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    )}
                    onClick={() => {
                        // Mock file input - in real app, would trigger file picker
                        alert('Avatar upload is mocked in demo mode')
                    }}
                >
                    Change Photo
                </button>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    JPG, PNG or GIF. Max 2MB.
                </p>
            </div>
        </div>
    )
}
