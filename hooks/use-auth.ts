'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export interface SignUpData {
    email: string
    password: string
    fullName: string
    role: 'client' | 'professional'
}

export function useAuth() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const supabase = createClient()

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        setError(null)

        try {
            const { session, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) {
                setError(authError)
                setLoading(false)
                return { success: false, error: authError }
            }

            if (session) {
                // Use window.location to ensure cookie is sent with next request
                window.location.href = '/dashboard'
                return { success: true, session }
            }

            setError('Unknown error occurred')
            setLoading(false)
            return { success: false, error: 'Unknown error occurred' }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Network error'
            setError(message)
            setLoading(false)
            return { success: false, error: message }
        }
    }

    const signUp = async (data: SignUpData) => {
        setLoading(true)
        setError(null)

        try {
            const { session, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                        role: data.role,
                    },
                },
            })

            if (authError) {
                setError(authError)
                setLoading(false)
                return { success: false, error: authError }
            }

            if (session) {
                // Use window.location to ensure cookie is sent with next request
                window.location.href = '/dashboard'
                return { success: true, session }
            }

            setError('Unknown error occurred')
            setLoading(false)
            return { success: false, error: 'Unknown error occurred' }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Network error'
            setError(message)
            setLoading(false)
            return { success: false, error: message }
        }
    }

    const signOut = async () => {
        setLoading(true)
        setError(null)

        try {
            await supabase.auth.signOut()
            router.push('/login')
            router.refresh()
            return { success: true }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Network error'
            setError(message)
            setLoading(false)
            return { success: false, error: message }
        }
    }

    return {
        signIn,
        signUp,
        signOut,
        loading,
        error,
        setError,
    }
}
