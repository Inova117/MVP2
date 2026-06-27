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

const demoAccounts = [
    { label: 'Profesional', email: 'ana.garcia@example.com' },
    { label: 'Cliente', email: 'maria.lopez@example.com' },
]
const DEMO_PASSWORD = 'Demo123!'

export default function LoginPage() {
    const { signIn, loading, error, setError } = useAuth()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInInput) => {
        setError(null)
        await signIn(data.email, data.password)
    }

    const fillDemo = (email: string) => {
        setError(null)
        setValue('email', email, { shouldValidate: true })
        setValue('password', DEMO_PASSWORD, { shouldValidate: true })
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-ink-900">
                    Bienvenido de vuelta
                </h1>
                <p className="mt-2 text-ink-600">
                    Ingresa a tu cuenta para continuar
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
                        Correo electrónico
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        autoFocus
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
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </div>

                <Button type="submit" className="w-full" size="lg" loading={loading}>
                    Ingresar
                </Button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-ink-600">
                    ¿No tienes cuenta?{' '}
                    <Link
                        href="/register"
                        className="font-semibold text-sage-700 transition-colors hover:text-sage-600"
                    >
                        Crear cuenta
                    </Link>
                </p>
            </div>

            {/* Acceso rápido a la demo */}
            <div className="mt-8 rounded-2xl border border-cream-200 bg-cream-100 p-5">
                <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </span>
                    <h3 className="text-sm font-semibold text-ink-800">
                        Acceso rápido a la demo
                    </h3>
                </div>
                <p className="mt-1.5 text-xs text-ink-500">
                    Rellena las credenciales con un clic. Contraseña:{' '}
                    <code className="rounded bg-cream-200 px-1 py-0.5 font-mono text-ink-700">
                        {DEMO_PASSWORD}
                    </code>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {demoAccounts.map((acc) => (
                        <button
                            key={acc.email}
                            type="button"
                            onClick={() => fillDemo(acc.email)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-cream-50 px-3 py-1.5 text-xs font-medium text-ink-700 transition-colors hover:border-sage-300 hover:bg-sage-50 hover:text-sage-700"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
                            Entrar como {acc.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
