'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { ProfileForm } from '@/components/profile/profile-form'
import { Alert } from '@/components/ui/alert'
import type { Session, Profile } from '@/lib/mock-db/types'

export default function ProfilePage() {
    const [user, setUser] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: sessionData } = await supabase.auth.getSession()
            if (!sessionData.session) {
                router.push('/login')
                return
            }

            setUser(sessionData.session)

            // Fetch profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', sessionData.session.user_id)
                .execute()

            // Handle both single object and array response formats
            if (profileData) {
                if (Array.isArray(profileData)) {
                    // API returned array
                    if (profileData[0]) {
                        setProfile(profileData[0])
                    }
                } else {
                    // API returned single object
                    setProfile(profileData as Profile)
                }
            }
            setLoading(false)
        }

        fetchProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run once on mount

    const handleSave = async (data: Partial<Profile>) => {
        if (!user) return // Guard clause

        try {
            setError(null)
            setSuccess(false)

            const { error: updateError } = await supabase
                .from('profiles')
                .eq('id', user.user_id)
                .update({
                    full_name: data.full_name,
                    specialty: data.specialty || null,
                    bio: data.bio || null,
                    hourly_rate: data.hourly_rate || null,
                    updated_at: new Date().toISOString(),
                })

            if (updateError) {
                throw new Error('No se pudo actualizar el perfil')
            }

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudieron guardar los cambios')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-sage-500 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-ink-600">
                        Cargando…
                    </p>
                </div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="p-6">
                <Alert variant="error">Perfil no encontrado</Alert>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-ink-900">
                    Mi perfil
                </h1>
                <p className="mt-2 text-ink-600">
                    Administra tu información personal y tus datos profesionales
                </p>
            </div>

            {success && (
                <Alert variant="success">Perfil actualizado correctamente</Alert>
            )}

            {error && <Alert variant="error">{error}</Alert>}

            <div className="rounded-lg border border-cream-200 bg-cream-50 p-6">
                <ProfileForm
                    initialData={{
                        email: user?.email || '',
                        full_name: profile.full_name,
                        role: profile.role,
                        specialty: profile.specialty,
                        bio: profile.bio,
                        hourly_rate: profile.hourly_rate,
                        avatar_url: profile.avatar_url,
                    }}
                    onSave={handleSave}
                />
            </div>
        </div>
    )
}
