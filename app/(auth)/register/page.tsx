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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create your account
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Get started with your booking platform
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
                        Full Name
                    </Label>
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        autoFocus
                        autoComplete="name"
                        error={errors.fullName?.message}
                        {...register('fullName')}
                    />
                </div>

                <div>
                    <Label htmlFor="email" required>
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>

                <div>
                    <Label htmlFor="password" required>
                        Password
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
                    <Label required>I want to</Label>
                    <RoleSelector
                        value={role}
                        onChange={(newRole) => setValue('role', newRole)}
                    />
                    {errors.role && (
                        <p className="mt-2 text-sm text-error-600 dark:text-error-400">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full" size="lg" loading={loading}>
                    Create Account
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
