export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50 dark:from-gray-950 dark:via-gray-900 dark:to-sky-950">
            <div className="flex min-h-screen">
                {/* Left side - Form */}
                <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
                    <div className="w-full max-w-md">{children}</div>
                </div>

                {/* Right side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:bg-gradient-to-br lg:from-primary-500 lg:to-secondary-500 lg:px-20 xl:px-24">
                    <div className="text-white">
                        <h1 className="text-4xl font-bold">
                            Welcome to Booking Platform
                        </h1>
                        <p className="mt-4 text-lg text-primary-100">
                            Connect with professionals or offer your services. Manage appointments with ease.
                        </p>

                        <div className="mt-12 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 rounded-full bg-white/10 p-3">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Easy Scheduling</h3>
                                    <p className="text-sm text-primary-100">
                                        Book appointments in just a few clicks
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 rounded-full bg-white/10 p-3">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Secure & Private</h3>
                                    <p className="text-sm text-primary-100">
                                        Your data is protected with enterprise-grade security
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 rounded-full bg-white/10 p-3">
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Real-time Updates</h3>
                                    <p className="text-sm text-primary-100">
                                        Get instant notifications about your appointments
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
