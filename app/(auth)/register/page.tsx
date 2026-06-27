'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import { signUpSchema, type SignUpInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { PasswordStrengthMeter } from '@/components/auth/password-strength-meter'
import { RoleSelector } from '@/components/auth/role-selector'

export default function RegisterPage() {
    const { signUp, loading, error, setError } = useAuth()
    const [password, setPassword] = useState('')

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            role: 'client',
        },
    })

    const role = watch('role')

    const onSubmit = async (data: SignUpInput) => {
        setError(null)
        await signUp({
            email: data.email,
            password: data.password,
            fullName: data.fullName,
            role: data.role,
        })
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-ink-900">
                    Crea tu cuenta
                </h1>
                <p className="mt-2 text-ink-600">
                    Empieza a gestionar tu agenda en minutos
                </p>
            </div>

            {error && (
                <Alert variant="error" className="mb-6">
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <Label htmlFor="fullName" required>
                        Nombre completo
                    </Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="Ana García"
                        autoFocus
                        autoComplete="name"
                        error={errors.fullName?.message}
                        {...register('fullName')}
                    />
                </div>

                <div>
                    <Label htmlFor="email" required>
                        Correo electrónico
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>

                <div>
                    <Label htmlFor="password" required>
                        Contraseña
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        error={errors.password?.message}
                        {...register('password', {
                            onChange: (e) => setPassword(e.target.value),
                        })}
                    />
                    <PasswordStrengthMeter password={password} />
                </div>

                <div>
                    <Label required>Quiero</Label>
                    <RoleSelector
                        value={role}
                        onChange={(newRole) => setValue('role', newRole)}
                    />
                    {errors.role && (
                        <p className="mt-2 text-sm text-error-600">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" size="lg" loading={loading}>
                    Crear cuenta
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-ink-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                        href="/login"
                        className="font-semibold text-sage-700 transition-colors hover:text-sage-600"
                    >
                        Ingresar
                    </Link>
                </p>
            </div>
        </div>
    )
}
