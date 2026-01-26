'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import { signInSchema, type SignInInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'

export default function LoginPage() {
    const { signIn, loading, error, setError } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInInput) => {
        setError(null)
        await signIn(data.email, data.password)
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Sign in to your account to continue
                </p>
            </div>

            {error && (
                <Alert variant="error" className="mb-6">
                    {error}
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <Label htmlFor="email" required>
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoFocus
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" required>
                            Password
                        </Label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </div>

                <Button type="submit" className="w-full" size="lg" loading={loading}>
                    Sign In
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/register"
                        className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-8 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-900/20 p-4">
                <h3 className="text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2">
                    Demo Credentials
                </h3>
                <div className="space-y-1 text-xs text-sky-700 dark:text-sky-300">
                    <p>
                        <strong>Professional:</strong> ana.garcia@example.com / Demo123!
                    </p>
                    <p>
                        <strong>Client:</strong> maria.lopez@example.com / Demo123!
                    </p>
                </div>
            </div>
        </div>
    )
}
