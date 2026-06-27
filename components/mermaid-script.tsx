// Mermaid Script Component - Add to layout or page
'use client'

import Script from 'next/script'

interface MermaidApi {
    initialize: (config: Record<string, unknown>) => void
}

function initMermaid() {
    if (typeof window === 'undefined') return
    const mermaid = (window as unknown as { mermaid?: MermaidApi }).mermaid
    if (!mermaid) return
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'strict',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    })
}

export function MermaidScript() {
    return (
        <Script
            src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
            strategy="lazyOnload"
            onLoad={initMermaid}
        />
    )
}
