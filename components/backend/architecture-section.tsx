export function ArchitectureSection() {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    🏗️ Architecture Overview
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Production-ready Next.js architecture with enterprise-grade patterns
                </p>
            </div>

            {/* Mermaid Diagram */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
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
    
    style A fill:#e0f2fe
    style B fill:#dbeafe
    style C fill:#bfdbfe
    style D fill:#fef3c7
    style E fill:#fef3c7
    style F fill:#fef9c3
    style G fill:#fef9c3
    style H fill:#fef9c3`}
                    </pre>
                </div>
            </div>

            {/* Key Features Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-green-900 dark:text-green-100">
                                Production-Ready Architecture
                            </h3>
                            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                                Next.js 16 with App Router, TypeScript strict mode, and React 19
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-green-900 dark:text-green-100">
                                Serverless & Auto-Scaling
                            </h3>
                            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                                API routes automatically scale with demand, zero infrastructure management
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-green-900 dark:text-green-100">
                                Built-in Authentication
                            </h3>
                            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                                JWT-based auth with HTTP-only cookies and bcrypt password hashing
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <h3 className="font-semibold text-green-900 dark:text-green-100">
                                Type-Safe Development
                            </h3>
                            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                                Full TypeScript coverage with strict mode and Zod validation schemas
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Technology Stack
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-md bg-sky-50 dark:bg-sky-900/20 px-3 py-2">
                        <div className="text-xs font-medium text-sky-600 dark:text-sky-400">
                            Frontend
                        </div>
                        <div className="mt-1 text-sm font-semibold text-sky-900 dark:text-sky-100">
                            Next.js 16 + React 19
                        </div>
                    </div>
                    <div className="rounded-md bg-fuchsia-50 dark:bg-fuchsia-900/20 px-3 py-2">
                        <div className="text-xs font-medium text-fuchsia-600 dark:text-fuchsia-400">
                            Backend
                        </div>
                        <div className="mt-1 text-sm font-semibold text-fuchsia-900 dark:text-fuchsia-100">
                            API Routes + Mock DB
                        </div>
                    </div>
                    <div className="rounded-md bg-purple-50 dark:bg-purple-900/20 px-3 py-2">
                        <div className="text-xs font-medium text-purple-600 dark:text-purple-400">
                            Language
                        </div>
                        <div className="mt-1 text-sm font-semibold text-purple-900 dark:text-purple-100">
                            TypeScript 5 (Strict)
                        </div>
                    </div>
                    <div className="rounded-md bg-cyan-50 dark:bg-cyan-900/20 px-3 py-2">
                        <div className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                            Auth
                        </div>
                        <div className="mt-1 text-sm font-semibold text-cyan-900 dark:text-cyan-100">
                            JWT + bcrypt
                        </div>
                    </div>
                    <div className="rounded-md bg-green-50 dark:bg-green-900/20 px-3 py-2">
                        <div className="text-xs font-medium text-green-600 dark:text-green-400">
                            Validation
                        </div>
                        <div className="mt-1 text-sm font-semibold text-green-900 dark:text-green-100">
                            Zod Schemas
                        </div>
                    </div>
                    <div className="rounded-md bg-orange-50 dark:bg-orange-900/20 px-3 py-2">
                        <div className="text-xs font-medium text-orange-600 dark:text-orange-400">
                            Testing
                        </div>
                        <div className="mt-1 text-sm font-semibold text-orange-900 dark:text-orange-100">
                            Vitest + Playwright
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
