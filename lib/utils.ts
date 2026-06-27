import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    })
}

export function formatLongDate(date: Date | string) {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })
}

export function formatTime(date: Date | string) {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
}

/** Devuelve las iniciales (máx. 2) de un nombre, tolerante a nombres simples. */
export function getInitials(name?: string | null) {
    if (!name) return '?'
    const parts = name.trim().split(/\s+/).filter(Boolean)
    const first = parts[0]
    if (!first) return '?'
    if (parts.length === 1) return first.slice(0, 2).toUpperCase()
    const last = parts[parts.length - 1] ?? first
    return ((first[0] ?? '') + (last[0] ?? '')).toUpperCase()
}

/** Formatea un precio en USD sin decimales innecesarios. */
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
}
