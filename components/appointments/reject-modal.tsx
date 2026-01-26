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
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
                onClick={onCancel}
            />
            <div className="relative w-full max-w-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Reject Appointment
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    You are about to reject "{appointmentTitle}". Please provide a reason.
                </p>

                <div className="mt-4">
                    <Label htmlFor="reason">Reason for rejection</Label>
                    <textarea
                        id="reason"
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-2 flex w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 resize-none"
                        placeholder="e.g., Schedule conflict, not available..."
                    />
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!reason.trim()}
                        className="bg-error-600 hover:bg-error-700 dark:bg-error-600 dark:hover:bg-error-700"
                    >
                        Reject Appointment
                    </Button>
                </div>
            </div>
        </div>
    )
}
