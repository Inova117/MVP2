// Security Features Component
'use client'

import { useState } from 'react'

export function SecurityFeatures() {
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

    const features = [
        {
            id: 'rls',
            name: 'Row Level Security (RLS)',
            status: 'active',
            description: 'Los usuarios solo pueden acceder a sus propios datos',
            details: 'Las políticas RLS de PostgreSQL imponen el aislamiento de datos a nivel de base de datos. Cada consulta filtra automáticamente los resultados según el usuario autenticado.',
            example: `-- Users can only see their own dashboards
CREATE POLICY "Users see own dashboards"
ON dashboards FOR SELECT
USING (auth.uid() = user_id);`
        },
        {
            id: 'validation',
            name: 'API Input Validation',
            status: 'active',
            description: 'Todas las entradas se validan con esquemas Zod',
            details: 'La validación del lado del servidor garantiza que los datos maliciosos nunca lleguen a la base de datos. Los esquemas con tipado seguro previenen ataques de inyección.',
            example: `// Dashboard creation schema
const schema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  layout: z.array(z.object({
    i: z.string(),
    x: z.number(),
    y: z.number()
  }))
});`
        },
        {
            id: 'middleware',
            name: 'Auth Middleware',
            status: 'active',
            description: 'Las rutas protegidas requieren autenticación',
            details: 'El middleware de Next.js verifica la autenticación antes de renderizar las páginas protegidas. Los usuarios no autorizados se redirigen al inicio de sesión.',
            example: `// Protect dashboard routes
export function middleware(request) {
  const session = await getSession()
  if (!session) {
    return redirect('/login')
  }
  return next()
}`
        },
        {
            id: 'encryption',
            name: 'Data Encryption',
            status: 'active',
            description: 'Todos los datos están cifrados en reposo y en tránsito',
            details: 'Supabase proporciona cifrado AES-256 en reposo. Todas las conexiones usan TLS 1.3 para los datos en tránsito.',
            example: 'Cifrado automático gestionado por la infraestructura de Supabase'
        }
    ]

    const activeFeature = features.find((feature) => feature.id === selectedFeature)

    return (
        <div className="bg-cream-100 rounded-xl border border-cream-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-clay-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-clay-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-ink-900">Seguridad y protección de datos</h2>
                    <p className="text-ink-600">Seguridad de nivel empresarial integrada</p>
                </div>
            </div>

            {/* Features Table */}
            <div className="overflow-hidden rounded-lg border border-cream-200">
                <table className="min-w-full divide-y divide-cream-200">
                    <thead className="bg-cream-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider">
                                Característica de seguridad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-cream-100 divide-y divide-cream-200">
                        {features.map((feature) => (
                            <tr key={feature.id} className="hover:bg-cream-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-ink-900">{feature.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                                        ✓ Activo
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-ink-600">{feature.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button
                                        onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                                        className="text-sage-600 hover:text-sage-800 font-medium"
                                    >
                                        {selectedFeature === feature.id ? 'Ocultar' : 'Mostrar'} detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Feature Details (Expandable) */}
            {activeFeature && (
                <div className="mt-6 p-6 bg-cream-50 rounded-lg border border-cream-200">
                    <h3 className="text-lg font-semibold text-ink-900 mb-2">{activeFeature.name}</h3>
                    <p className="text-ink-700 mb-4">{activeFeature.details}</p>
                    <div className="bg-ink-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-cream-100 font-mono">
                            {activeFeature.example}
                        </pre>
                    </div>
                </div>
            )}

            {/* Compliance Badges */}
            <div className="mt-6 pt-6 border-t border-cream-200">
                <p className="text-sm text-ink-600 mb-3 font-medium">Cumplimiento y estándares:</p>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-sage-50 border border-sage-200 rounded-lg text-sm font-medium text-sage-700">
                        SOC 2 Type II Ready
                    </div>
                    <div className="px-4 py-2 bg-clay-50 border border-clay-200 rounded-lg text-sm font-medium text-clay-700">
                        GDPR Compliant
                    </div>
                    <div className="px-4 py-2 bg-sage-50 border border-sage-200 rounded-lg text-sm font-medium text-sage-700">
                        HIPAA Compatible
                    </div>
                </div>
            </div>
        </div>
    )
}
