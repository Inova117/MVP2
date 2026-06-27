// Architecture Overview for MVP #2 - Booking Platform
'use client'

export function ArchitectureOverview() {
    return (
        <div className="bg-cream-100 rounded-xl border border-cream-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-sage-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-ink-900">Resumen de la arquitectura</h2>
                    <p className="text-ink-600">Sistema de reservas calendar-first con disponibilidad en tiempo real</p>
                </div>
            </div>

            <div className="bg-cream-50 rounded-lg p-6 mb-6">
                <div className="mermaid">
                    {`graph TB
    A[Client Portal] -->|HTTPS| B[Next.js Frontend]
    B -->|API Routes| C[Server-Side API]
    C -->|Validates| D[Zod Schemas]
    C -->|Queries| E[(Supabase PostgreSQL)]
    C -->|Auth Check| F[Supabase Auth]
    E -->|RLS Policies| G[Row Level Security]
    E -->|Real-time| H[Calendar Updates]
    F -->|JWT Token| B

    style A fill:#f4f2eb,stroke:#4a6543,color:#26261f
    style B fill:#e5ece2,stroke:#4a6543,color:#26261f
    style C fill:#cbd9c6,stroke:#4a6543,color:#26261f
    style D fill:#f3e4d9,stroke:#97502f,color:#26261f
    style E fill:#e5ece2,stroke:#4a6543,color:#26261f
    style F fill:#f3e4d9,stroke:#97502f,color:#26261f
    style G fill:#f4f2eb,stroke:#26261f,color:#26261f
    style H fill:#f4f2eb,stroke:#26261f,color:#26261f`}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-sage-50 rounded-lg border border-sage-200">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-ink-900">Calendario en tiempo real</h3>
                    </div>
                    <p className="text-sm text-ink-600">
                        La disponibilidad se sincroniza al instante para todos los usuarios.
                    </p>
                </div>

                <div className="p-4 bg-sage-50 rounded-lg border border-sage-200">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-ink-900">Prevención de conflictos</h3>
                    </div>
                    <p className="text-sm text-ink-600">
                        Prevención automática de dobles reservas integrada.
                    </p>
                </div>

                <div className="p-4 bg-sage-50 rounded-lg border border-sage-200">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-ink-900">Notificaciones por correo</h3>
                    </div>
                    <p className="text-sm text-ink-600">
                        Recordatorios y confirmaciones automáticos por correo electrónico.
                    </p>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-cream-200">
                <p className="text-sm text-ink-600 mb-3 font-medium">Tecnologías utilizadas:</p>
                <div className="flex flex-wrap gap-2">
                    {['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'date-fns', 'React Hook Form', 'Vercel'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-cream-200 text-ink-700 text-sm rounded-full font-medium">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
