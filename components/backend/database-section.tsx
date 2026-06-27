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
            rlsPolicy: 'SELECT público, los usuarios solo pueden hacer UPDATE de su propio perfil',
            relationships: '1 a muchos con appointments (como cliente), 1 a muchos con appointments (como profesional), 1 a muchos con availability_settings',
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
            rlsPolicy: 'SELECT público, solo el profesional propietario puede hacer INSERT/UPDATE/DELETE',
            relationships: 'Muchos a uno con profiles (profesional)',
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
            rlsPolicy: 'Los usuarios solo ven las citas en las que participan. Los clientes pueden hacer INSERT. Reglas de UPDATE según el rol.',
            relationships: 'Muchos a uno con profiles (cliente), Muchos a uno con profiles (profesional)',
            constraints: 'no_overlap: Evita la doble reserva para los profesionales',
        },
    }

    const detail = selectedTable ? tableDetails[selectedTable] : undefined

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-ink-900">
                    🗄️ Esquema de base de datos
                </h2>
                <p className="mt-2 text-ink-600">
                    Modelo de datos relacional con integridad garantizada y seguridad a nivel de fila
                </p>
            </div>

            {/* ERD Diagram */}
            <div className="rounded-lg border border-cream-200 bg-cream-100 p-6">
                <div className="text-center text-sm font-mono space-y-8">
                    {/* Profiles */}
                    <div
                        className={`inline-block cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedTable === 'profiles'
                            ? 'border-sage-500 bg-sage-50 shadow-lg'
                            : 'border-cream-300 hover:border-sage-400 hover:shadow-md'
                            }`}
                        onClick={() => setSelectedTable(selectedTable === 'profiles' ? null : 'profiles')}
                    >
                        <div className="font-bold text-lg text-ink-900">PROFILES</div>
                        <div className="mt-2 space-y-1 text-left text-xs text-ink-600">
                            <div>• id (PK)</div>
                            <div>• email (UNIQUE)</div>
                            <div>• role</div>
                            <div>• specialty</div>
                        </div>
                    </div>

                    <div className="text-ink-400">↓ 1:N ↓</div>

                    {/* Appointments and Availability Side by Side */}
                    <div className="flex items-start justify-center gap-8">
                        <div
                            className={`inline-block cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedTable === 'appointments'
                                ? 'border-sage-500 bg-sage-50 shadow-lg'
                                : 'border-cream-300 hover:border-sage-400 hover:shadow-md'
                                }`}
                            onClick={() => setSelectedTable(selectedTable === 'appointments' ? null : 'appointments')}
                        >
                            <div className="font-bold text-lg text-ink-900">APPOINTMENTS</div>
                            <div className="mt-2 space-y-1 text-left text-xs text-ink-600">
                                <div>• id (PK)</div>
                                <div>• client_id (FK)</div>
                                <div>• professional_id (FK)</div>
                                <div>• status</div>
                            </div>
                        </div>

                        <div
                            className={`inline-block cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedTable === 'availability_settings'
                                ? 'border-sage-500 bg-sage-50 shadow-lg'
                                : 'border-cream-300 hover:border-sage-400 hover:shadow-md'
                                }`}
                            onClick={() =>
                                setSelectedTable(selectedTable === 'availability_settings' ? null : 'availability_settings')
                            }
                        >
                            <div className="font-bold text-lg text-ink-900">AVAILABILITY_SETTINGS</div>
                            <div className="mt-2 space-y-1 text-left text-xs text-ink-600">
                                <div>• id (PK)</div>
                                <div>• professional_id (FK)</div>
                                <div>• day_of_week</div>
                                <div>• duration</div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-ink-500">
                        Haz clic en una tabla para ver detalles
                    </p>
                </div>
            </div>

            {/* Table Details Panel */}
            {selectedTable && detail && (
                <div className="rounded-lg border border-cream-200 bg-cream-100 p-6">
                    <h3 className="text-xl font-bold capitalize text-ink-900 mb-4">
                        Tabla {selectedTable.replace('_', ' ')}
                    </h3>

                    {/* Columns */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-ink-700 mb-2">
                            Columnas ({detail.columns.length})
                        </h4>
                        <div className="space-y-2">
                            {detail.columns.map((col) => (
                                <div
                                    key={col.name}
                                    className="flex items-center justify-between rounded bg-cream-50 px-3 py-2 text-sm"
                                >
                                    <span className="font-mono font-medium text-ink-900">
                                        {col.name}
                                    </span>
                                    <span className="text-ink-600">{col.type}</span>
                                    <span className="text-xs text-ink-500">{col.constraint}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RLS Policy */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-ink-700 mb-2">
                            Políticas (RLS)
                        </h4>
                        <div className="rounded bg-success-50 px-3 py-2 text-sm text-success-800">
                            {detail.rlsPolicy}
                        </div>
                    </div>

                    {/* Relationships */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-ink-700 mb-2">
                            Relaciones
                        </h4>
                        <div className="rounded bg-info-50 px-3 py-2 text-sm text-info-800">
                            {detail.relationships}
                        </div>
                    </div>

                    {/* Constraints (if any) */}
                    {detail.constraints && (
                        <div>
                            <h4 className="text-sm font-semibold text-ink-700 mb-2">
                                Restricciones especiales
                            </h4>
                            <div className="rounded bg-warning-50 px-3 py-2 text-sm text-warning-800">
                                {detail.constraints}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
