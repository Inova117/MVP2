import { ArchitectureSection } from '@/components/backend/architecture-section'
import { SecuritySection } from '@/components/backend/security-section'
import { DatabaseSection } from '@/components/backend/database-section'
import { ApiSection } from '@/components/backend/api-section'

export default function BackendPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Header */}
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                            Backend & Security
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            Enterprise-grade architecture powering the booking platform
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="space-y-16">
                    {/* Architecture */}
                    <div id="architecture">
                        <ArchitectureSection />
                    </div>

                    {/* Security */}
                    <div id="security" className="border-t border-gray-200 dark:border-gray-800 pt-16">
                        <SecuritySection />
                    </div>

                    {/* Database */}
                    <div id="database" className="border-t border-gray-200 dark:border-gray-800 pt-16">
                        <DatabaseSection />
                    </div>

                    {/* API */}
                    <div id="api" className="border-t border-gray-200 dark:border-gray-800 pt-16">
                        <ApiSection />
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete backend implementation • Enterprise security • Production-ready
                    </p>
                </footer>
            </main>

            {/* Floating Navigation */}
            <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 shadow-lg">
                    <div className="space-y-2">
                        <a
                            href="#architecture"
                            className="block rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-700 dark:text-gray-300 dark:hover:bg-sky-900/30 dark:hover:text-sky-300 transition-colors"
                        >
                            🏗️ Architecture
                        </a>
                        <a
                            href="#security"
                            className="block rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 dark:text-gray-300 dark:hover:bg-green-900/30 dark:hover:text-green-300 transition-colors"
                        >
                            🔒 Security
                        </a>
                        <a
                            href="#database"
                            className="block rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 dark:text-gray-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-300 transition-colors"
                        >
                            🗄️ Database
                        </a>
                        <a
                            href="#api"
                            className="block rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700 dark:text-gray-300 dark:hover:bg-fuchsia-900/30 dark:hover:text-fuchsia-300 transition-colors"
                        >
                            🛣️ API
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
