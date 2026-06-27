import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import { DemoBanner } from '@/components/demo-banner'
import { BackendFloatButton } from '@/components/backend-float-button'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    subsets: ['latin'],
    variable: '--font-merriweather',
})

export const metadata: Metadata = {
    title: {
        default: 'Agenda · Plataforma de Agendamiento',
        template: '%s · Agenda',
    },
    description:
        'Automatiza tu agenda y recupera horas cada semana. Reservas online 24/7, confirmaciones automáticas y recordatorios para clínicas, salones y consultorios.',
    keywords: [
        'agendamiento',
        'reservas online',
        'citas',
        'clínicas',
        'salones',
        'consultorios',
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${merriweather.variable} antialiased`}
                suppressHydrationWarning
            >
                <DemoBanner />
                {children}
                <BackendFloatButton />
            </body>
        </html>
    )
}
