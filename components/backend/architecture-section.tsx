export function ArchitectureSection() {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-ink-900">
                    🏗️ Resumen de la arquitectura
                </h2>
                <p className="mt-2 text-ink-600">
                    Arquitectura Next.js lista para producción con patrones de nivel empresarial
                </p>
            </div>

            {/* Mermaid Diagram */}
            <div className="rounded-lg border border-cream-200 bg-cream-100 p-6">
                <div className="mermaid-diagram">
                    <pre className="text-center text-sm">
                        {`graph TB
    A[Client Browser] --> B[Next.js 16 Frontend]
    B --> C[API Routes Layer]
    C --> D[Auth Service]
    C --> E[Mock Database]
    D --> F[JWT + bcrypt]
    E --> G[In-Memory Storage]
    E --> H[RLS Policy Engine]

    style A fill:#f4f2eb,stroke:#4a6543,color:#26261f
    style B fill:#e5ece2,stroke:#4a6543,color:#26261f
    style C fill:#cbd9c6,stroke:#4a6543,color:#26261f
    style D fill:#f3e4d9,stroke:#97502f,color:#26261f
    style E fill:#f3e4d9,stroke:#97502f,color:#26261f
    style F fill:#f4f2eb,stroke:#26261f,color:#26261f
    style G fill:#f4f2eb,stroke:#26261f,color:#26261f
    style H fill:#f4f2eb,stroke:#26261f,color:#26261f`}
                    </pre>
                </div>
            </div>

            {/* Key Features Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-sage-200 bg-sage-50 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-sage-900">
                                Arquitectura lista para producción
                            </h3>
                            <p className="mt-1 text-sm text-sage-700">
                                Next.js 16 con App Router, modo estricto de TypeScript y React 19
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-sage-200 bg-sage-50 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-sage-900">
                                Serverless y autoescalable
                            </h3>
                            <p className="mt-1 text-sm text-sage-700">
                                Las rutas de la API escalan automáticamente con la demanda, sin gestión de infraestructura
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-sage-200 bg-sage-50 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-sage-900">
                                Autenticación integrada
                            </h3>
                            <p className="mt-1 text-sm text-sage-700">
                                Autenticación basada en JWT con cookies HTTP-only y hashing de contraseñas con bcrypt
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-sage-200 bg-sage-50 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-sage-900">
                                Desarrollo con tipado seguro
                            </h3>
                            <p className="mt-1 text-sm text-sage-700">
                                Cobertura completa de TypeScript con modo estricto y esquemas de validación Zod
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="rounded-lg border border-cream-200 bg-cream-100 p-6">
                <h3 className="text-lg font-semibold text-ink-900 mb-4">
                    Stack tecnológico
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-md bg-sage-50 px-3 py-2">
                        <div className="text-xs font-medium text-sage-600">
                            Frontend
                        </div>
                        <div className="mt-1 text-sm font-semibold text-sage-900">
                            Next.js 16 + React 19
                        </div>
                    </div>
                    <div className="rounded-md bg-clay-50 px-3 py-2">
                        <div className="text-xs font-medium text-clay-600">
                            Backend
                        </div>
                        <div className="mt-1 text-sm font-semibold text-clay-900">
                            API Routes + Mock DB
                        </div>
                    </div>
                    <div className="rounded-md bg-sage-50 px-3 py-2">
                        <div className="text-xs font-medium text-sage-600">
                            Lenguaje
                        </div>
                        <div className="mt-1 text-sm font-semibold text-sage-900">
                            TypeScript 5 (Strict)
                        </div>
                    </div>
                    <div className="rounded-md bg-clay-50 px-3 py-2">
                        <div className="text-xs font-medium text-clay-600">
                            Auth
                        </div>
                        <div className="mt-1 text-sm font-semibold text-clay-900">
                            JWT + bcrypt
                        </div>
                    </div>
                    <div className="rounded-md bg-sage-50 px-3 py-2">
                        <div className="text-xs font-medium text-sage-600">
                            Validación
                        </div>
                        <div className="mt-1 text-sm font-semibold text-sage-900">
                            Zod Schemas
                        </div>
                    </div>
                    <div className="rounded-md bg-clay-50 px-3 py-2">
                        <div className="text-xs font-medium text-clay-600">
                            Testing
                        </div>
                        <div className="mt-1 text-sm font-semibold text-clay-900">
                            Vitest + Playwright
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
