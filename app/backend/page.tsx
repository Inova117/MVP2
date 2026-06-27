import { ArchitectureSection } from '@/components/backend/architecture-section'
import { SecuritySection } from '@/components/backend/security-section'
import { DatabaseSection } from '@/components/backend/database-section'
import { ApiSection } from '@/components/backend/api-section'

export default function BackendPage() {
    return (
        <div className="min-h-screen bg-cream-50">
            {/* Header */}
            <header className="border-b border-cream-200 bg-cream-100/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                            Arquitectura y seguridad
                        </h1>
                        <p className="mt-4 text-lg text-ink-600">
                            Arquitectura de nivel empresarial que impulsa la plataforma de reservas
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
                    <div id="security" className="border-t border-cream-200 pt-16">
                        <SecuritySection />
                    </div>

                    {/* Database */}
                    <div id="database" className="border-t border-cream-200 pt-16">
                        <DatabaseSection />
                    </div>

                    {/* API */}
                    <div id="api" className="border-t border-cream-200 pt-16">
                        <ApiSection />
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 border-t border-cream-200 pt-8 text-center">
                    <p className="text-sm text-ink-500">
                        Implementación completa del backend • Seguridad empresarial • Listo para producción
                    </p>
                </footer>
            </main>

            {/* Floating Navigation */}
            <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                <div className="rounded-lg border border-cream-200 bg-cream-100/90 backdrop-blur-sm p-2 shadow-lg">
                    <div className="space-y-2">
                        <a
                            href="#architecture"
                            className="block rounded px-3 py-2 text-sm font-medium text-ink-700 hover:bg-sage-50 hover:text-sage-700 transition-colors"
                        >
                            🏗️ Arquitectura
                        </a>
                        <a
                            href="#security"
                            className="block rounded px-3 py-2 text-sm font-medium text-ink-700 hover:bg-sage-50 hover:text-sage-700 transition-colors"
                        >
                            🔒 Seguridad
                        </a>
                        <a
                            href="#database"
                            className="block rounded px-3 py-2 text-sm font-medium text-ink-700 hover:bg-sage-50 hover:text-sage-700 transition-colors"
                        >
                            🗄️ Base de datos
                        </a>
                        <a
                            href="#api"
                            className="block rounded px-3 py-2 text-sm font-medium text-ink-700 hover:bg-sage-50 hover:text-sage-700 transition-colors"
                        >
                            🛣️ API
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
