'use client'

import { useState } from 'react'

type TableName = 'profiles' | 'availability_settings' | 'appointments' | null

export function DatabaseSection() {
    const [selectedTable, setSelectedTable] = useState<TableName>(null)

    const tableDetails: Record<
        string,
        {
            columns: Array<{ name: string; type: string; constraint: string }>
            rlsPolicy: string
            relationships: string
            constraints?: string
        }
    > = {
        profiles: {
            columns: [
                { name: 'id', type: 'uuid', constraint: 'PRIMARY KEY' },
                { name: 'email', type: 'string', constraint: 'UNIQUE' },
                { name: 'full_name', type: 'string', constraint: 'NOT NULL' },
                { name: 'role', type: 'enum', constraint: "'client' | 'professional'" },
                { name: 'specialty', type: 'string', constraint: 'NULLABLE' },
                { name: 'bio', type: 'text', constraint: 'MAX 500 chars' },
                { name: 'hourly_rate', type: 'decimal', constraint: 'NULLABLE' },
            ],
            rlsPolicy: 'Public SELECT, users can UPDATE only their own profile',
            relationships: '1-to-many with appointments (as client), 1-to-many with appointments (as professional), 1-to-many with availability_settings',
        },
        availability_settings: {
            columns: [
                { name: 'id', type: 'uuid', constraint: 'PRIMARY KEY' },
                { name: 'professional_id', type: 'uuid', constraint: 'FOREIGN KEY → profiles.id' },
                { name: 'day_of_week', type: 'integer', constraint: '0-6 (Sunday-Saturday)' },
                { name: 'start_time', type: 'time', constraint: 'HH:MM format' },
                { name: 'end_time', type: 'time', constraint: 'HH:MM format' },
                { name: 'appointment_duration', type: 'integer', constraint: '30 | 60 | 90 | 120 minutes' },
            ],
            rlsPolicy: 'Public SELECT, only owning professional can INSERT/UPDATE/DELETE',
            relationships: 'Many-to-one with profiles (professional)',
        },
        appointments: {
            columns: [
                { name: 'id', type: 'uuid', constraint: 'PRIMARY KEY' },
                { name: 'client_id', type: 'uuid', constraint: 'FOREIGN KEY → profiles.id' },
                { name: 'professional_id', type: 'uuid', constraint: 'FOREIGN KEY → profiles.id' },
                { name: 'title', type: 'string', constraint: 'NOT NULL' },
                { name: 'description', type: 'text', constraint: 'NULLABLE, MAX 500' },
                { name: 'start_time', type: 'timestamp', constraint: 'NOT NULL' },
                { name: 'end_time', type: 'timestamp', constraint: 'NOT NULL' },
                { name: 'status', type: 'enum', constraint: "'pending' | 'confirmed' | 'cancelled' | 'completed'" },
            ],
            rlsPolicy: 'Users see only appointments where they are involved. Clients can INSERT. Role-based UPDATE rules.',
            relationships: 'Many-to-one with profiles (client), Many-to-one with profiles (professional)',
            constraints: 'no_overlap: Prevents double-booking for professionals',
        },
    }

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    🗄️ Database Schema
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Relational data model with enforced integrity and row-level security
                </p>
            </div>

            {/* ERD Diagram */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <div className="text-center text-sm font-mono space-y-8">
                    {/* Profiles */}
                    <div
                        className={`inline-block cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedTable === 'profiles'
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 shadow-lg'
                            : 'border-gray-300 dark:border-gray-600 hover:border-sky-400 hover:shadow-md'
                            }`}
                        onClick={() => setSelectedTable(selectedTable === 'profiles' ? null : 'profiles')}
                    >
                        <div className="font-bold text-lg text-gray-900 dark:text-white">PROFILES</div>
                        <div className="mt-2 space-y-1 text-left text-xs text-gray-600 dark:text-gray-400">
                            <div>• id (PK)</div>
                            <div>• email (UNIQUE)</div>
                            <div>• role</div>
                            <div>• specialty</div>
                        </div>
                    </div>

                    <div className="text-gray-400">↓ 1:N ↓</div>

                    {/* Appointments and Availability Side by Side */}
                    <div className="flex items-start justify-center gap-8">
                        <div
                            className={`inline-block cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedTable === 'appointments'
                                ? 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/30 shadow-lg'
                                : 'border-gray-300 dark:border-gray-600 hover:border-fuchsia-400 hover:shadow-md'
                                }`}
                            onClick={() => setSelectedTable(selectedTable === 'appointments' ? null : 'appointments')}
                        >
                            <div className="font-bold text-lg text-gray-900 dark:text-white">APPOINTMENTS</div>
                            <div className="mt-2 space-y-1 text-left text-xs text-gray-600 dark:text-gray-400">
                                <div>• id (PK)</div>
                                <div>• client_id (FK)</div>
                                <div>• professional_id (FK)</div>
                                <div>• status</div>
                            </div>
                        </div>

                        <div
                            className={`inline-block cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedTable === 'availability_settings'
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg'
                                : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:shadow-md'
                                }`}
                            onClick={() =>
                                setSelectedTable(selectedTable === 'availability_settings' ? null : 'availability_settings')
                            }
                        >
                            <div className="font-bold text-lg text-gray-900 dark:text-white">AVAILABILITY_SETTINGS</div>
                            <div className="mt-2 space-y-1 text-left text-xs text-gray-600 dark:text-gray-400">
                                <div>• id (PK)</div>
                                <div>• professional_id (FK)</div>
                                <div>• day_of_week</div>
                                <div>• duration</div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Click on a table to view details
                    </p>
                </div>
            </div>

            {/* Table Details Panel */}
            {selectedTable && tableDetails[selectedTable] && (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <h3 className="text-xl font-bold capitalize text-gray-900 dark:text-white mb-4">
                        {selectedTable.replace('_', ' ')} Table
                    </h3>

                    {/* Columns */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Columns ({tableDetails[selectedTable].columns.length})
                        </h4>
                        <div className="space-y-2">
                            {tableDetails[selectedTable].columns.map((col) => (
                                <div
                                    key={col.name}
                                    className="flex items-center justify-between rounded bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm"
                                >
                                    <span className="font-mono font-medium text-gray-900 dark:text-white">
                                        {col.name}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400">{col.type}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-500">{col.constraint}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RLS Policy */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            RLS Policy
                        </h4>
                        <div className="rounded bg-green-50 dark:bg-green-900/20 px-3 py-2 text-sm text-green-800 dark:text-green-300">
                            {tableDetails[selectedTable].rlsPolicy}
                        </div>
                    </div>

                    {/* Relationships */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Relationships
                        </h4>
                        <div className="rounded bg-sky-50 dark:bg-sky-900/20 px-3 py-2 text-sm text-sky-800 dark:text-sky-300">
                            {tableDetails[selectedTable].relationships}
                        </div>
                    </div>

                    {/* Constraints (if any) */}
                    {tableDetails[selectedTable].constraints && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Special Constraints
                            </h4>
                            <div className="rounded bg-orange-50 dark:bg-orange-900/20 px-3 py-2 text-sm text-orange-800 dark:text-orange-300">
                                {tableDetails[selectedTable].constraints}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
