import Link from 'next/link'
import { Button } from '@/components/ui/button'

/* -------------------------------------------------------------------------- */
/*  Iconografía (trazo consistente, hereda currentColor)                       */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string }

const Icon = {
    calendar: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    clock: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    bell: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
    ),
    chart: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M8 17V9m5 8V5m5 12v-6" />
        </svg>
    ),
    devices: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    shield: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.6-2.6A11.96 11.96 0 0112 21.8 11.96 11.96 0 013.4 7.4 12 12 0 0012 2.9a12 12 0 008.6 4.5z" />
        </svg>
    ),
    arrow: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    ),
    check: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    leaf: (p: IconProps) => (
        <svg className={p.className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 2c1 2.5 1.5 5 .5 9-1 4-4 7-8.5 7H11z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 22c4-3 6.5-6 9-12" />
        </svg>
    ),
}

/* -------------------------------------------------------------------------- */
/*  Datos de contenido                                                         */
/* -------------------------------------------------------------------------- */

const features = [
    {
        icon: Icon.calendar,
        title: 'Reservas 24/7',
        description:
            'Tus clientes agendan online cuando quieran, sin llamadas ni esperas. Tú solo confirmas con un toque.',
    },
    {
        icon: Icon.bell,
        title: 'Recordatorios automáticos',
        description:
            'Confirmaciones y recordatorios que reducen los no-shows hasta en un 70%. Menos huecos, más ingresos.',
    },
    {
        icon: Icon.clock,
        title: 'Disponibilidad inteligente',
        description:
            'Define tus horarios y duración de cita una vez. La agenda evita choques y dobles reservas por ti.',
    },
    {
        icon: Icon.chart,
        title: 'Panel en tiempo real',
        description:
            'Mira tus citas del día de un vistazo, marca completadas y entiende tu ocupación al instante.',
    },
    {
        icon: Icon.devices,
        title: 'Pensado para móvil',
        description:
            'El 70% reserva desde el celular. Una experiencia impecable en cualquier pantalla, sin instalar nada.',
    },
    {
        icon: Icon.shield,
        title: 'Seguro por diseño',
        description:
            'Autenticación robusta, políticas de acceso por fila y datos protegidos de extremo a extremo.',
    },
]

const steps = [
    {
        n: '01',
        title: 'Configura tu agenda',
        description:
            'Define tus horarios de atención, la duración de cada cita y tu tarifa. Listo en minutos.',
    },
    {
        n: '02',
        title: 'Comparte tu enlace',
        description:
            'Tus clientes ven tu disponibilidad real y reservan el espacio que más les conviene.',
    },
    {
        n: '03',
        title: 'Recibe y confirma',
        description:
            'Cada reserva llega a tu panel. Confirma, reagenda o completa con un solo clic.',
    },
]

const stats = [
    { value: '−70%', label: 'Reducción de no-shows' },
    { value: '+40%', label: 'Más reservas con disponibilidad 24/7' },
    { value: '15 h', label: 'Ahorradas por semana en coordinación' },
    { value: '<2 min', label: 'Tiempo promedio para agendar' },
]

const plans = [
    {
        name: 'Básico',
        price: '$29',
        cadence: '/mes',
        description: 'Para quienes empiezan a profesionalizar su agenda.',
        features: ['1 profesional', 'Hasta 100 citas / mes', 'Recordatorios por email', 'Panel de gestión'],
        featured: false,
    },
    {
        name: 'Profesional',
        price: '$79',
        cadence: '/mes',
        description: 'El favorito de clínicas y salones en crecimiento.',
        features: ['Hasta 5 profesionales', 'Citas ilimitadas', 'Recordatorios email + WhatsApp', 'Métricas de ocupación', 'Soporte prioritario'],
        featured: true,
    },
    {
        name: 'Enterprise',
        price: '$199',
        cadence: '/mes',
        description: 'Para equipos grandes que necesitan marca propia.',
        features: ['Profesionales ilimitados', 'White-label', 'Integraciones a medida', 'Gestor de cuenta dedicado'],
        featured: false,
    },
]

/* -------------------------------------------------------------------------- */
/*  Secciones                                                                  */
/* -------------------------------------------------------------------------- */

function Logo({ className }: IconProps) {
    return (
        <Link href="/" className={`group inline-flex items-center gap-2.5 ${className ?? ''}`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-cream-50 shadow-tactile-sm transition-transform group-hover:-rotate-6">
                <Icon.leaf className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-bold tracking-tight text-ink-900">
                Agenda
            </span>
        </Link>
    )
}

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-cream-200/70 bg-cream-50/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Logo />
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link
                        href="/backend"
                        className="hidden text-sm font-medium text-ink-600 transition-colors hover:text-sage-700 sm:block"
                    >
                        Arquitectura
                    </Link>
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Ingresar
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm">Empezar gratis</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

function Hero() {
    return (
        <section className="bg-sanctuary relative overflow-hidden">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
                {/* Columna de texto */}
                <div className="animate-rise text-center lg:text-left">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-cream-50/70 px-3 py-1 text-xs font-semibold text-sage-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
                        Agendamiento para servicios · LATAM
                    </span>
                    <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
                        Automatiza tu agenda y{' '}
                        <span className="text-sage-600">recupera tu tiempo</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-600 lg:mx-0">
                        Clínicas, salones y consultorios reciben reservas online 24/7,
                        confirman con un toque y eliminan el caos del WhatsApp.
                        Menos coordinación, menos no-shows, más ingresos.
                    </p>
                    <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                        <Link href="/register">
                            <Button size="lg">
                                Crear cuenta gratis
                                <Icon.arrow className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline">
                                Ver demo
                            </Button>
                        </Link>
                    </div>
                    <p className="mt-5 text-sm text-ink-500">
                        Sin tarjeta · Datos de ejemplo listos para explorar
                    </p>
                </div>

                {/* Columna visual: vista previa de la app */}
                <div className="animate-rise [animation-delay:120ms]">
                    <BookingPreview />
                </div>
            </div>
        </section>
    )
}

/** Mock visual de una tarjeta de reserva — transmite que el producto es real. */
function BookingPreview() {
    const slots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
    const taken = new Set(['10:00', '11:00'])
    const selected = '10:30'
    return (
        <div className="relative mx-auto max-w-md">
            <div className="absolute -right-4 -top-4 hidden rotate-3 rounded-2xl bg-clay-500 px-4 py-3 text-sm font-semibold text-cream-50 shadow-tactile-lg sm:block">
                ✓ Cita confirmada
            </div>
            <div className="rounded-2xl border border-cream-200 bg-cream-50 p-6 shadow-tactile-floating">
                <div className="flex items-center gap-3 border-b border-cream-200 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 font-serif font-bold text-sage-700">
                        AG
                    </div>
                    <div>
                        <p className="font-serif font-bold text-ink-900">Dra. Ana García</p>
                        <p className="text-sm text-ink-500">Psicología · $80 / sesión</p>
                    </div>
                </div>
                <p className="mt-4 text-sm font-medium text-ink-600">
                    Martes 30 de junio · horarios disponibles
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {slots.map((s) => {
                        const isTaken = taken.has(s)
                        const isSelected = s === selected
                        return (
                            <div
                                key={s}
                                className={[
                                    'rounded-lg border py-2 text-center text-sm font-medium',
                                    isSelected
                                        ? 'border-sage-500 bg-sage-500 text-cream-50 shadow-tactile-sm'
                                        : isTaken
                                          ? 'cursor-not-allowed border-cream-200 bg-cream-100 text-ink-300 line-through'
                                          : 'border-cream-300 bg-cream-50 text-ink-700',
                                ].join(' ')}
                            >
                                {s}
                            </div>
                        )
                    })}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-sage-50 px-4 py-3">
                    <div>
                        <p className="text-xs text-ink-500">Seleccionado</p>
                        <p className="font-semibold text-ink-900">10:30 – 11:30</p>
                    </div>
                    <span className="inline-flex items-center justify-center rounded-full bg-sage-600 px-4 py-2 text-sm font-semibold text-cream-50">
                        Reservar
                    </span>
                </div>
            </div>
        </div>
    )
}

function StatsBand() {
    return (
        <section className="border-y border-cream-200 bg-cream-100">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                {stats.map((s) => (
                    <div key={s.label} className="text-center">
                        <p className="font-serif text-3xl font-bold text-sage-600 sm:text-4xl">
                            {s.value}
                        </p>
                        <p className="mt-2 text-sm text-ink-600">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

function HowItWorks() {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">
                        Cómo funciona
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">
                        Listo en tres pasos
                    </h2>
                    <p className="mt-4 text-lg text-ink-600">
                        Sin curva de aprendizaje. Configuras una vez y la agenda trabaja por ti.
                    </p>
                </div>
                <div className="mt-14 grid gap-8 md:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.n} className="relative">
                            <span className="font-serif text-5xl font-bold text-sage-200">
                                {step.n}
                            </span>
                            <h3 className="mt-2 text-xl font-semibold text-ink-900">
                                {step.title}
                            </h3>
                            <p className="mt-3 leading-relaxed text-ink-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Features() {
    return (
        <section className="bg-cream-100 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">
                        Todo lo que necesitas
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">
                        Una agenda que se siente profesional
                    </h2>
                    <p className="mt-4 text-lg text-ink-600">
                        Las herramientas que tu negocio de servicios necesita, sin la complejidad.
                    </p>
                </div>
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const FeatureIcon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-cream-200 bg-cream-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-tactile-lg"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-700 transition-colors group-hover:bg-sage-600 group-hover:text-cream-50">
                                    <FeatureIcon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-ink-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 leading-relaxed text-ink-600">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function Testimonial() {
    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-3xl bg-sage-700 px-8 py-14 text-center shadow-tactile-lg sm:px-14">
                <p className="font-serif text-2xl font-light leading-relaxed text-cream-50 sm:text-3xl">
                    “Pasamos de coordinar todo por WhatsApp a tener la agenda llena
                    sola. Los recordatorios automáticos casi eliminaron los no-shows.”
                </p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 font-serif font-bold text-sage-700">
                        LM
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-cream-50">Laura Medina</p>
                        <p className="text-sm text-sage-200">
                            Directora · Clínica Bienestar
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Pricing() {
    return (
        <section className="bg-cream-100 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-clay-600">
                        Planes
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-ink-900 sm:text-4xl">
                        Precios simples y honestos
                    </h2>
                    <p className="mt-4 text-lg text-ink-600">
                        Empieza gratis con datos de ejemplo. Escala cuando tu negocio lo pida.
                    </p>
                </div>
                <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={[
                                'flex flex-col rounded-2xl border p-8 transition-all',
                                plan.featured
                                    ? 'border-sage-300 bg-cream-50 shadow-tactile-lg lg:-translate-y-3'
                                    : 'border-cream-200 bg-cream-50 shadow-tactile-sm',
                            ].join(' ')}
                        >
                            {plan.featured && (
                                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-clay-500 px-3 py-1 text-xs font-semibold text-cream-50">
                                    Más popular
                                </span>
                            )}
                            <h3 className="font-serif text-xl font-bold text-ink-900">
                                {plan.name}
                            </h3>
                            <p className="mt-2 text-sm text-ink-600">{plan.description}</p>
                            <div className="mt-5 flex items-baseline gap-1">
                                <span className="font-serif text-4xl font-bold text-ink-900">
                                    {plan.price}
                                </span>
                                <span className="text-ink-500">{plan.cadence}</span>
                            </div>
                            <ul className="mt-6 flex-1 space-y-3">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                                            <Icon.check className="h-3 w-3" />
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/register" className="mt-8">
                                <Button
                                    className="w-full"
                                    variant={plan.featured ? 'primary' : 'outline'}
                                >
                                    Comenzar
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FinalCTA() {
    return (
        <section className="bg-sanctuary px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl">
                    Tu agenda, en piloto automático
                </h2>
                <p className="mt-4 text-lg text-ink-600">
                    Explora la demo con datos reales en menos de un minuto. Sin
                    instalaciones, sin tarjeta de crédito.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href="/register">
                        <Button size="lg">Crear cuenta gratis</Button>
                    </Link>
                    <Link href="/login">
                        <Button size="lg" variant="outline">
                            Entrar a la demo
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="border-t border-cream-200 bg-cream-100 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
                <Logo />
                <p className="text-sm text-ink-500">
                    © 2026 Agenda · Construido por Zerion Studio con Next.js y TypeScript.
                </p>
                <Link
                    href="/backend"
                    className="text-sm font-medium text-ink-600 transition-colors hover:text-sage-700"
                >
                    Arquitectura & seguridad →
                </Link>
            </div>
        </footer>
    )
}

export default function HomePage() {
    return (
        <div className="min-h-screen bg-cream-50">
            <Navbar />
            <main>
                <Hero />
                <StatsBand />
                <HowItWorks />
                <Features />
                <Testimonial />
                <Pricing />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    )
}
