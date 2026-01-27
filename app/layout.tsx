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
    title: 'Analytics Dashboard - Demo',
    description: 'Enterprise analytics platform with real-time insights',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
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
