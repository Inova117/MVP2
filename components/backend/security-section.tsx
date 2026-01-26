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
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    🔒 Security & Data Protection
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Enterprise-grade security features protecting user data and preventing unauthorized access
                </p>
            </div>

            {/* Security Features Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Feature
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Implementation
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Protection Level
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                Row Level Security (RLS)
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-400">
                                    ✅ Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Custom policy engine
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                User data isolation
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                Password Hashing
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-400">
                                    ✅ Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                bcrypt (10 rounds)
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Credential protection
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                JWT Authentication
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-400">
                                    ✅ Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                HTTP-only cookies
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Session security
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                API Input Validation
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-400">
                                    ✅ Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Zod schemas
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Injection prevention
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                Route Protection
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-400">
                                    ✅ Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Middleware guards
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Access control
                            </td>
                        </tr>
                        <tr>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                Appointment Overlap Check
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-400">
                                    ✅ Active
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Database constraint
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Data integrity
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* RLS Example Toggle */}
            <div>
                <button
                    onClick={() => setShowRLSExample(!showRLSExample)}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
                >
                    {showRLSExample ? '▼' : '▶'} View RLS Policy Example
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
