import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DemoBanner } from '@/components/demo-banner'
import { BackendFloatButton } from '@/components/backend-float-button'

const inter = Inter({ subsets: ['latin'] })

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
            <body className={inter.className} suppressHydrationWarning>
                <DemoBanner />
                {children}
                <BackendFloatButton />
            </body>
        </html>
    )
}
