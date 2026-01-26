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
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    specialty: z.string().optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    hourly_rate: z.number().min(0, 'Rate must be positive').optional(),
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
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Profile Photo
                </h3>
                <AvatarUpload
                    currentUrl={initialData.avatar_url}
                    userName={initialData.full_name}
                />
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Basic Information
                </h3>

                <div>
                    <Label htmlFor="full_name" required>
                        Full Name
                    </Label>
                    <Input
                        id="full_name"
                        {...register('full_name')}
                        error={errors.full_name?.message}
                    />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={initialData.email}
                        disabled
                        className="bg-gray-50 dark:bg-gray-900"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Email cannot be changed
                    </p>
                </div>

                <div>
                    <Label htmlFor="role">Role</Label>
                    <div className="mt-2">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${isProfessional
                                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                }`}
                        >
                            {isProfessional ? '👨‍💼 Professional' : '👤 Client'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Professional-Only Fields */}
            {isProfessional && (
                <div className="space-y-4 rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10 p-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Professional Information
                    </h3>

                    <div>
                        <Label htmlFor="specialty">Specialty</Label>
                        <select
                            id="specialty"
                            {...register('specialty')}
                            className="flex h-12 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30"
                        >
                            <option value="">Select a specialty</option>
                            {SPECIALTIES.map((specialty) => (
                                <option key={specialty} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </select>
                        {errors.specialty && (
                            <p className="mt-1.5 text-sm text-error-600 dark:text-error-400">
                                {errors.specialty.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            rows={4}
                            {...register('bio')}
                            className="flex w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 resize-none"
                            placeholder="Tell clients about yourself..."
                        />
                        <div className="mt-1.5 flex items-center justify-between">
                            {errors.bio && (
                                <p className="text-sm text-error-600 dark:text-error-400">
                                    {errors.bio.message}
                                </p>
                            )}
                            <p
                                className={`ml-auto text-xs ${bioLength > 500
                                    ? 'text-error-600 dark:text-error-400'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                {bioLength}/500
                            </p>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="hourly_rate">Hourly Rate (USD)</Label>
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
            <div className="flex items-center justify-end gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.reload()}
                >
                    Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    Save Changes
                </Button>
            </div>
        </form>
    )
}
