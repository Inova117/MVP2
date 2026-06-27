'use client'

import { useState } from 'react'
import { CodeBlock } from './code-block'

export function SecuritySection() {
    const [showRLSExample, setShowRLSExample] = useState(false)

    const rlsExampleCode = `// Row Level Security Policy Example
// Users can only see appointments where they are involved

canSelectAppointment(session: Session | null, appointment: Appointment): boolean {
  if (!session) return false

  return (
    session.user_id === appointment.client_id ||
    session.user_id === appointment.professional_id
  )
}

// Clients can only create appointments for themselves
canInsertAppointment(session: Session | null, appointment: Appointment): boolean {
  if (!session) return false

  const profile = db.getProfile(session.user_id)
  if (!profile || profile.role !== 'client') return false

  return session.user_id === appointment.client_id
}`

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-ink-900">
                    🔒 Seguridad y protección de datos
                </h2>
                <p className="mt-2 text-ink-600">
                    Características de seguridad de nivel empresarial que protegen los datos de los usuarios y evitan accesos no autorizados
                </p>
            </div>

            {/* Security Features Table */}
            <div className="overflow-hidden rounded-lg border border-cream-200 bg-cream-100">
                <table className="min-w-full divide-y divide-cream-200">
                    <thead className="bg-cream-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-500">
                                Característica
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-500">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-500">
                                Implementación
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-500">
                                Nivel de protección
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-200 bg-cream-100">
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink-900">
                                Row Level Security (RLS)
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-success-100 px-2 text-xs font-semibold leading-5 text-success-800">
                                    ✅ Activo
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Motor de políticas personalizado
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Aislamiento de datos del usuario
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink-900">
                                Hashing de contraseñas
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-success-100 px-2 text-xs font-semibold leading-5 text-success-800">
                                    ✅ Activo
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                bcrypt (10 rounds)
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Protección de credenciales
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink-900">
                                Autenticación JWT
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-success-100 px-2 text-xs font-semibold leading-5 text-success-800">
                                    ✅ Activo
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Cookies HTTP-only
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Seguridad de la sesión
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink-900">
                                Validación de entradas de la API
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-success-100 px-2 text-xs font-semibold leading-5 text-success-800">
                                    ✅ Activo
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Esquemas Zod
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Prevención de inyecciones
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink-900">
                                Protección de rutas
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-success-100 px-2 text-xs font-semibold leading-5 text-success-800">
                                    ✅ Activo
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Guardas de middleware
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Control de acceso
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-ink-900">
                                Verificación de solapamiento de citas
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-success-100 px-2 text-xs font-semibold leading-5 text-success-800">
                                    ✅ Activo
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Restricción de base de datos
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-500">
                                Integridad de los datos
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* RLS Example Toggle */}
            <div>
                <button
                    onClick={() => setShowRLSExample(!showRLSExample)}
                    className="inline-flex items-center gap-2 rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-sage-700 transition-colors"
                >
                    {showRLSExample ? '▼' : '▶'} Ver ejemplo de política RLS
                </button>

                {showRLSExample && (
                    <div className="mt-4">
                        <CodeBlock
                            code={rlsExampleCode}
                            language="typescript"
                            title="lib/mock-db/rls.ts"
                        />
                    </div>
                )}
            </div>
        </section>
    )
}
