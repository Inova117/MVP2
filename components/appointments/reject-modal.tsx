'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface RejectModalProps {
    isOpen: boolean
    appointmentTitle: string
    onConfirm: (reason: string) => void
    onCancel: () => void
}

export function RejectModal({
    isOpen,
    appointmentTitle,
    onConfirm,
    onCancel,
}: RejectModalProps) {
    const [reason, setReason] = useState('')

    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm(reason)
        setReason('')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
                onClick={onCancel}
            />
            <div className="relative w-full max-w-md rounded-2xl border border-cream-200 bg-cream-50 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-ink-900">
                    Rechazar cita
                </h3>
                <p className="mt-2 text-sm text-ink-600">
                    Estás por rechazar «{appointmentTitle}». Indica un motivo.
                </p>

                <div className="mt-4">
                    <Label htmlFor="reason">Motivo del rechazo</Label>
                    <textarea
                        id="reason"
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-2 flex w-full rounded-lg border-2 border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-sage-400 focus:outline-none focus:ring-4 focus:ring-sage-200 resize-none"
                        placeholder="p. ej., conflicto de horario, no disponible…"
                    />
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <Button variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!reason.trim()}
                        className="bg-error-600 hover:bg-error-700"
                    >
                        Rechazar cita
                    </Button>
                </div>
            </div>
        </div>
    )
}
