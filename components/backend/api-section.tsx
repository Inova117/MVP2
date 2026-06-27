'use client'

import { useState } from 'react'
import { CodeBlock } from './code-block'

type EndpointId = string | null

interface EndpointDoc {
    description: string
    request: string
    response: string
    errors?: string
}

const methodBadgeClass = (method: string): string => {
    switch (method) {
        case 'GET':
            return 'bg-success-100 text-success-800'
        case 'POST':
            return 'bg-info-100 text-info-800'
        case 'PATCH':
            return 'bg-warning-100 text-warning-800'
        case 'DELETE':
            return 'bg-error-100 text-error-800'
        default:
            return 'bg-cream-200 text-ink-700'
    }
}

const endpoints: Record<string, EndpointDoc> = {
    'POST /api/auth/signup': {
        description: 'Registrar una nueva cuenta de usuario',
        request: `{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "Ana García",
  "role": "client" // o "professional"
}`,
        response: `// 201 Created
{
  "session": {
    "user_id": "uuid-here",
    "email": "user@example.com",
    "role": "client"
  }
}`,
        errors: `// 400 Bad Request - Validación
{
  "error": "Validation failed",
  "details": [...]
}

// 400 Bad Request - Usuario existente
{
  "error": "User already exists"
}`,
    },
    'POST /api/auth/login': {
        description: 'Autenticar al usuario y crear una sesión',
        request: `{
  "email": "user@example.com",
  "password": "SecurePass123!"
}`,
        response: `// 200 OK
{
  "session": {
    "user_id": "uuid-here",
    "email": "user@example.com",
    "role": "client",
    "profile": { ... }
  }
}`,
        errors: `// 401 Unauthorized
{
  "error": "Invalid credentials"
}`,
    },
    'POST /api/auth/logout': {
        description: 'Cerrar la sesión y limpiar la cookie',
        request: `// Sin cuerpo. Usa la cookie httpOnly "auth-token".
POST /api/auth/logout`,
        response: `// 200 OK
{
  "success": true
}
// La cookie "auth-token" se elimina (maxAge: 0)`,
    },
    'GET /api/auth/session': {
        description: 'Obtener la sesión actual con el perfil',
        request: `// Sin parámetros. Lee la cookie httpOnly "auth-token".
GET /api/auth/session`,
        response: `// 200 OK (autenticado)
{
  "session": {
    "user_id": "uuid",
    "email": "user@example.com",
    "role": "professional",
    "profile": { ... }
  }
}

// 200 OK (sin sesión)
{
  "session": null
}`,
    },
    'GET /api/profiles': {
        description: 'Listar todos los perfiles o filtrar por rol',
        request: `// Parámetros de consulta:
?role=professional  // Opcional: filtrar por rol
?id=uuid            // Opcional: obtener un perfil`,
        response: `// 200 OK
{
  "data": [
    {
      "id": "uuid",
      "email": "ana.garcia@example.com",
      "full_name": "Dra. Ana García",
      "role": "professional",
      "specialty": "Psicólogo",
      "bio": "10 años de experiencia...",
      "hourly_rate": 80
    }
  ]
}`,
        errors: `// 404 Not Found
{
  "error": "Profile not found"
}`,
    },
    'PATCH /api/profiles': {
        description: 'Actualizar el perfil del usuario autenticado',
        request: `{
  "full_name": "Dra. Ana García",
  "specialty": "Psicólogo",
  "bio": "Terapia cognitivo-conductual...",
  "hourly_rate": 90
}`,
        response: `// 200 OK
{
  "data": {
    "id": "uuid",
    "full_name": "Dra. Ana García",
    "specialty": "Psicólogo",
    "hourly_rate": 90,
    "updated_at": "2026-01-16T09:00:00Z"
  }
}`,
        errors: `// 403 Forbidden (RLS: solo tu propio perfil)
{
  "error": "Unauthorized"
}`,
    },
    'GET /api/appointments': {
        description: 'Listar las citas del usuario autenticado',
        request: `// Sin parámetros: devuelve las citas donde el
// usuario es cliente o profesional.
?id=uuid  // Opcional: obtener una cita específica`,
        response: `// 200 OK
{
  "data": [
    {
      "id": "uuid",
      "client_id": "uuid",
      "professional_id": "uuid",
      "title": "Sesión de terapia",
      "status": "confirmed",
      "start_time": "2026-01-20T10:00:00Z",
      "end_time": "2026-01-20T11:00:00Z"
    }
  ]
}`,
        errors: `// 401 Unauthorized
{
  "error": "Unauthorized"
}`,
    },
    'POST /api/appointments': {
        description: 'Crear una nueva cita (solo clientes)',
        request: `{
  "professionalId": "uuid",
  "title": "Sesión de terapia",
  "description": "Consulta inicial",
  "startTime": "2026-01-20T10:00:00Z",
  "endTime": "2026-01-20T11:00:00Z"
}`,
        response: `// 201 Created
{
  "data": {
    "id": "uuid",
    "client_id": "uuid",
    "professional_id": "uuid",
    "title": "Sesión de terapia",
    "status": "pending",
    "start_time": "2026-01-20T10:00:00Z",
    "end_time": "2026-01-20T11:00:00Z",
    "created_at": "2026-01-15T12:00:00Z"
  }
}`,
        errors: `// 409 Conflict - Horario ocupado
{
  "error": "Slot no longer available"
}

// 403 Forbidden - No es cliente
{
  "error": "Unauthorized"
}`,
    },
    'PATCH /api/appointments': {
        description: 'Actualizar el estado de una cita',
        request: `// Query: ?id=appointment-uuid

// El cliente solo puede cancelar:
{
  "status": "cancelled",
  "cancellation_reason": "Conflicto de horario"
}

// El profesional puede confirmar/completar:
{
  "status": "confirmed" // o "completed"
}`,
        response: `// 200 OK
{
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "updated_at": "2026-01-16T09:00:00Z",
    ...
  }
}`,
        errors: `// 403 Forbidden
{
  "error": "Unauthorized"
}`,
    },
    'DELETE /api/appointments': {
        description: 'Eliminar una cita pendiente (solo clientes)',
        request: `// Query: ?id=appointment-uuid
DELETE /api/appointments?id=abc-123`,
        response: `// 200 OK
{
  "success": true
}`,
        errors: `// 403 Forbidden (solo el cliente, solo si está pendiente)
{
  "error": "Unauthorized"
}`,
    },
    'GET /api/availability': {
        description: 'Obtener el horario de disponibilidad del profesional',
        request: `// Query: ?professionalId=uuid
GET /api/availability?professionalId=abc-123`,
        response: `// 200 OK
{
  "data": [
    {
      "id": "uuid",
      "professional_id": "abc-123",
      "day_of_week": 1, // Lunes
      "start_time": "09:00",
      "end_time": "17:00",
      "appointment_duration": 60
    }
  ]
}`,
        errors: `// 400 Bad Request
{
  "error": "Professional ID required"
}`,
    },
    'POST /api/availability': {
        description: 'Crear un bloque de disponibilidad (solo profesionales)',
        request: `{
  "day_of_week": 1,          // 0=Domingo ... 6=Sábado
  "start_time": "09:00",
  "end_time": "17:00",
  "appointment_duration": 60 // 30 | 60 | 90 | 120
}`,
        response: `// 201 Created
{
  "data": {
    "id": "uuid",
    "professional_id": "uuid",
    "day_of_week": 1,
    "start_time": "09:00",
    "end_time": "17:00",
    "appointment_duration": 60
  }
}`,
        errors: `// 403 Forbidden - No es profesional
{
  "error": "Unauthorized"
}`,
    },
    'DELETE /api/availability': {
        description: 'Eliminar un bloque de disponibilidad',
        request: `// Query: ?id=availability-uuid
DELETE /api/availability?id=abc-123`,
        response: `// 200 OK
{
  "success": true
}`,
        errors: `// 403 Forbidden - No es profesional
{
  "error": "Unauthorized"
}`,
    },
}

const groups: { title: string; items: string[] }[] = [
    {
        title: 'Autenticación',
        items: [
            'POST /api/auth/signup',
            'POST /api/auth/login',
            'POST /api/auth/logout',
            'GET /api/auth/session',
        ],
    },
    {
        title: 'Perfiles',
        items: ['GET /api/profiles', 'PATCH /api/profiles'],
    },
    {
        title: 'Citas',
        items: [
            'GET /api/appointments',
            'POST /api/appointments',
            'PATCH /api/appointments',
            'DELETE /api/appointments',
        ],
    },
    {
        title: 'Disponibilidad',
        items: [
            'GET /api/availability',
            'POST /api/availability',
            'DELETE /api/availability',
        ],
    },
]

export function ApiSection() {
    const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointId>(null)

    const renderEndpoint = (endpoint: string) => {
        const method = endpoint.split(' ')[0] ?? ''
        const path = endpoint.split(' ')[1] ?? ''
        const doc = endpoints[endpoint]
        const isOpen = selectedEndpoint === endpoint

        return (
            <div
                key={endpoint}
                className={`overflow-hidden rounded-lg border transition-all ${
                    isOpen
                        ? 'border-sage-400 bg-cream-50 shadow-tactile-md'
                        : 'border-cream-200 bg-cream-50 hover:border-sage-300 hover:shadow-tactile-sm'
                }`}
            >
                {/* Cabecera clicable */}
                <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                        setSelectedEndpoint(isOpen ? null : endpoint)
                    }
                    className="w-full cursor-pointer px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-inset"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <span
                                className={`shrink-0 rounded px-2 py-1 text-xs font-bold ${methodBadgeClass(method)}`}
                            >
                                {method}
                            </span>
                            <span className="truncate font-mono text-sm text-ink-900">
                                {path}
                            </span>
                        </div>
                        <span
                            className={`shrink-0 text-ink-400 transition-transform duration-200 ${isOpen ? 'rotate-90 text-sage-600' : ''}`}
                        >
                            ▶
                        </span>
                    </div>
                    {doc && (
                        <p className="mt-1 text-sm text-ink-500">
                            {doc.description}
                        </p>
                    )}
                </button>

                {/* Detalle expandible en línea */}
                {isOpen && doc && (
                    <div className="space-y-4 border-t border-cream-200 bg-cream-100 p-4">
                        <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                                Solicitud
                            </h4>
                            <CodeBlock code={doc.request} language="json" />
                        </div>
                        <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                                Respuesta
                            </h4>
                            <CodeBlock code={doc.response} language="json" />
                        </div>
                        {doc.errors && (
                            <div>
                                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
                                    Casos de error
                                </h4>
                                <CodeBlock code={doc.errors} language="json" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-ink-900">
                    Endpoints de la API
                </h2>
                <p className="mt-2 text-ink-600">
                    API RESTful con ejemplos de solicitud y respuesta. Haz clic en
                    un endpoint para ver el detalle.
                </p>
            </div>

            <div className="space-y-8">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="mb-3 text-lg font-semibold text-ink-900">
                            {group.title}
                        </h3>
                        <div className="space-y-2">
                            {group.items.map(renderEndpoint)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
