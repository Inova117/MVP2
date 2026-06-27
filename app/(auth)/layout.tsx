import Link from 'next/link'

const benefits = [
    {
        title: 'Reservas 24/7',
        description: 'Tus clientes agendan online cuando quieran.',
        d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
        title: 'Menos no-shows',
        description: 'Recordatorios automáticos que llenan tu agenda.',
        d: 'M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    },
    {
        title: 'Seguro por diseño',
        description: 'Autenticación robusta y datos protegidos.',
        d: 'M9 12l2 2 4-4m5.6-2.6A11.96 11.96 0 0112 21.8 11.96 11.96 0 013.4 7.4 12 12 0 0012 2.9a12 12 0 008.6 4.5z',
    },
]

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-cream-50">
            <div className="flex min-h-screen">
                {/* Formulario */}
                <div className="flex w-full flex-col px-4 py-10 sm:px-6 lg:w-1/2 lg:px-20 xl:px-28">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2.5"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-cream-50 shadow-tactile-sm transition-transform group-hover:-rotate-6">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 2c1 2.5 1.5 5 .5 9-1 4-4 7-8.5 7H11z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 22c4-3 6.5-6 9-12" />
                            </svg>
                        </span>
                        <span className="font-serif text-xl font-bold tracking-tight text-ink-900">
                            Agenda
                        </span>
                    </Link>
                    <div className="flex flex-1 items-center justify-center py-10">
                        <div className="w-full max-w-md animate-rise">{children}</div>
                    </div>
                </div>

                {/* Branding */}
                <div className="bg-sanctuary relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:bg-sage-700 lg:px-20 xl:px-24">
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 1px 1px, var(--color-cream-50) 1px, transparent 0)',
                            backgroundSize: '28px 28px',
                        }}
                    />
                    <div className="relative text-cream-50">
                        <h2 className="font-serif text-4xl font-bold leading-tight">
                            Tu agenda, en piloto automático
                        </h2>
                        <p className="mt-4 max-w-md text-lg text-sage-100">
                            Conecta con profesionales u ofrece tus servicios.
                            Gestiona citas sin esfuerzo, desde cualquier lugar.
                        </p>

                        <div className="mt-12 space-y-7">
                            {benefits.map((b) => (
                                <div key={b.title} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 rounded-xl bg-cream-50/10 p-3 ring-1 ring-cream-50/15">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d={b.d} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{b.title}</h3>
                                        <p className="text-sm text-sage-200">
                                            {b.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
