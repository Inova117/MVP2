'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AvatarUpload } from './avatar-upload'

const SPECIALTIES = [
    'Médico',
    'Psicólogo',
    'Abogado',
    'Consultor',
    'Terapeuta',
    'Nutricionista',
    'Entrenador Personal',
    'Otro',
]

const profileSchema = z.object({
    full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    specialty: z.string().optional(),
    bio: z.string().max(500, 'La descripción debe tener menos de 500 caracteres').optional(),
    hourly_rate: z.number().min(0, 'La tarifa debe ser positiva').optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
    initialData: {
        email: string
        full_name: string
        role: 'client' | 'professional'
        specialty?: string
        bio?: string
        hourly_rate?: number
        avatar_url?: string
    }
    onSave: (data: ProfileFormData) => Promise<void>
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: initialData.full_name,
            specialty: initialData.specialty || '',
            bio: initialData.bio || '',
            hourly_rate: initialData.hourly_rate || undefined,
        },
    })

    const bioLength = watch('bio')?.length || 0
    const isProfessional = initialData.role === 'professional'

    return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-8">
            {/* Avatar */}
            <div>
                <h3 className="text-sm font-medium text-ink-900 mb-4">
                    Foto de perfil
                </h3>
                <AvatarUpload
                    currentUrl={initialData.avatar_url}
                    userName={initialData.full_name}
                />
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-ink-900">
                    Información personal
                </h3>

                <div>
                    <Label htmlFor="full_name" required>
                        Nombre completo
                    </Label>
                    <Input
                        id="full_name"
                        {...register('full_name')}
                        error={errors.full_name?.message}
                    />
                </div>

                <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                        id="email"
                        value={initialData.email}
                        disabled
                        className="bg-cream-200 text-ink-500 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-ink-500">
                        El correo no se puede cambiar
                    </p>
                </div>

                <div>
                    <Label htmlFor="role">Rol</Label>
                    <div className="mt-2">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${isProfessional
                                ? 'bg-sage-100 text-sage-700'
                                : 'bg-clay-100 text-clay-700'
                                }`}
                        >
                            {isProfessional ? '👨‍💼 Profesional' : '👤 Cliente'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Professional-Only Fields */}
            {isProfessional && (
                <div className="space-y-4 rounded-lg border border-sage-200 bg-sage-50 p-6">
                    <h3 className="text-sm font-medium text-ink-900">
                        Información profesional
                    </h3>

                    <div>
                        <Label htmlFor="specialty">Especialidad</Label>
                        <select
                            id="specialty"
                            {...register('specialty')}
                            className="flex h-12 w-full rounded-lg border-2 border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
                        >
                            <option value="">Selecciona una especialidad</option>
                            {SPECIALTIES.map((specialty) => (
                                <option key={specialty} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </select>
                        {errors.specialty && (
                            <p className="mt-1.5 text-sm text-error-600">
                                {errors.specialty.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="bio">Descripción</Label>
                        <textarea
                            id="bio"
                            rows={4}
                            {...register('bio')}
                            className="flex w-full rounded-lg border-2 border-cream-300 bg-cream-50 px-4 py-3 text-sm text-ink-900 transition-all focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200 resize-none"
                            placeholder="Cuéntales a tus clientes sobre ti…"
                        />
                        <div className="mt-1.5 flex items-center justify-between">
                            {errors.bio && (
                                <p className="text-sm text-error-600">
                                    {errors.bio.message}
                                </p>
                            )}
                            <p
                                className={`ml-auto text-xs ${bioLength > 500
                                    ? 'text-error-600'
                                    : 'text-ink-500'
                                    }`}
                            >
                                {bioLength}/500
                            </p>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="hourly_rate">Tarifa por hora (USD)</Label>
                        <Input
                            id="hourly_rate"
                            type="number"
                            min="0"
                            step="0.01"
                            {...register('hourly_rate', { valueAsNumber: true })}
                            error={errors.hourly_rate?.message}
                            placeholder="50.00"
                        />
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-cream-200 pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.reload()}
                >
                    Cancelar
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    Guardar cambios
                </Button>
            </div>
        </form>
    )
}
