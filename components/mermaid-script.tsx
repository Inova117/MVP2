// Mermaid Script Component - Add to layout or page
'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export function MermaidScript() {
    useEffect(() => {
        // Initialize Mermaid after script loads
        if (typeof window !== 'undefined' && (window as any).mermaid) {
            (window as any).mermaid.initialize({
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
            })
        }
    }, [])

    return (
        <Script
            src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
            strategy="lazyOnload"
            onLoad={() => {
                if ((window as any).mermaid) {
                    (window as any).mermaid.initialize({
                        startOnLoad: true,
                        theme: 'default',
                        securityLevel: 'loose',
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif'
                    })
                }
            }}
        />
    )
}
