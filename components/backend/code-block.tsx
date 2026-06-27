'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
    code: string
    language: string
    title?: string
    showLineNumbers?: boolean
}

export function CodeBlock({
    code,
    language,
    title,
    showLineNumbers = true,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative rounded-lg border border-ink-800 bg-ink-900 overflow-hidden">
            {title && (
                <div className="flex items-center justify-between border-b border-ink-800 bg-ink-800 px-4 py-2">
                    <span className="text-sm font-medium text-cream-200">{title}</span>
                    <button
                        onClick={handleCopy}
                        className="rounded px-2 py-1 text-xs font-medium text-cream-300 hover:bg-ink-700 hover:text-cream-50 transition-colors"
                    >
                        {copied ? '✓ Copiado' : 'Copiar'}
                    </button>
                </div>
            )}
            {!title && (
                <button
                    onClick={handleCopy}
                    className="absolute right-2 top-2 z-10 rounded bg-ink-800 px-2 py-1 text-xs font-medium text-cream-300 hover:bg-ink-700 hover:text-cream-50 transition-colors"
                >
                    {copied ? '✓ Copiado' : 'Copiar'}
                </button>
            )}
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                showLineNumbers={showLineNumbers}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.875rem',
                }}
                codeTagProps={{
                    style: {
                        fontFamily: 'ui-monospace, monospace',
                    },
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}
