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

export function ApiSection() {
    const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointId>(null)

    const endpoints: Record<string, EndpointDoc> = {
        'POST /api/auth/signup': {
            description: 'Register a new user account',
            request: `{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "role": "client" // or "professional"
}`,
            response: `// 201 Created
{
  "session": {
    "user_id": "uuid-here",
    "email": "user@example.com",
    "role": "client"
  }
}`,
            errors: `// 400 Bad Request - Validation failed
{
  "error": "Validation failed",
  "details": [...]
}

// 400 Bad Request - User exists
{
  "error": "User already exists"
}`,
        },
        'POST /api/auth/login': {
            description: 'Authenticate user and create session',
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
        'GET /api/profiles': {
            description: 'List all profiles or filter by role',
            request: `// Query parameters:
?role=professional  // Optional: filter by role
?id=uuid           // Optional: get specific profile`,
            response: `// 200 OK
{
  "data": [
    {
      "id": "uuid",
      "email": "ana.garcia@example.com",
      "full_name": "Dra. Ana García",
      "role": "professional",
      "specialty": "Psicóloga",
      "bio": "10 years experience...",
      "hourly_rate": 80
    }
  ]
}`,
            errors: `// 404 Not Found
{
  "error": "Profile not found"
}`,
        },
        'POST /api/appointments': {
            description: 'Create a new appointment (clients only)',
            request: `{
  "professionalId": "uuid",
  "title": "Therapy Session",
  "description": "Initial consultation",
  "startTime": "2024-01-20T10:00:00Z",
  "endTime": "2024-01-20T11:00:00Z"
}`,
            response: `// 201 Created
{
  "data": {
    "id": "uuid",
    "client_id": "uuid",
    "professional_id": "uuid",
    "title": "Therapy Session",
    "status": "pending",
    "start_time": "2024-01-20T10:00:00Z",
    "end_time": "2024-01-20T11:00:00Z",
    "created_at": "2024-01-15T12:00:00Z"
  }
}`,
            errors: `// 409 Conflict - Slot taken
{
  "error": "Slot no longer available"
}

// 403 Forbidden - Not a client
{
  "error": "Unauthorized"
}`,
        },
        'PATCH /api/appointments': {
            description: 'Update appointment status',
            request: `// Query: ?id=appointment-uuid

// Client can only cancel:
{
  "status": "cancelled",
  "cancellation_reason": "Schedule conflict"
}

// Professional can confirm/complete:
{
  "status": "confirmed" // or "completed"
}`,
            response: `// 200 OK
{
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "updated_at": "2024-01-16T09:00:00Z",
    ...
  }
}`,
            errors: `// 403 Forbidden
{
  "error": "Unauthorized"
}`,
        },
        'GET /api/availability': {
            description: "Get professional's availability schedule",
            request: `// Query: ?professionalId=uuid

GET /api/availability?professionalId=abc-123`,
            response: `// 200 OK
{
  "data": [
    {
      "id": "uuid",
      "professional_id": "abc-123",
      "day_of_week": 1, // Monday
      "start_time": "09:00",
      "end_time": "17:00",
      "appointment_duration": 60
    },
    ...
  ]
}`,
            errors: `// 400 Bad Request
{
  "error": "Professional ID required"
}`,
        },
    }

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    🛣️ API Documentation
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    RESTful API endpoints with request/response examples
                </p>
            </div>

            {/* Endpoint Groups */}
            <div className="space-y-8">
                {/* Authentication Endpoints */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Authentication
                    </h3>
                    <div className="space-y-2">
                        {['POST /api/auth/signup', 'POST /api/auth/login', 'POST /api/auth/logout', 'GET /api/auth/session'].map(
                            (endpoint) => (
                                <button
                                    key={endpoint}
                                    onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint ? null : endpoint)}
                                    className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${selectedEndpoint === endpoint
                                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 shadow-md'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-sky-400 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="rounded bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-semibold text-green-800 dark:text-green-400">
                                                {endpoint.split(' ')[0]}
                                            </span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-white">
                                                {endpoint.split(' ')[1]}
                                            </span>
                                        </div>
                                        <span className="text-gray-400">
                                            {selectedEndpoint === endpoint ? '▼' : '▶'}
                                        </span>
                                    </div>
                                    {endpoints[endpoint] && (
                                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {endpoints[endpoint].description}
                                        </div>
                                    )}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Profiles Endpoints */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Profiles
                    </h3>
                    <div className="space-y-2">
                        {['GET /api/profiles', 'PATCH /api/profiles'].map((endpoint) => (
                            <button
                                key={endpoint}
                                onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint ? null : endpoint)}
                                className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${selectedEndpoint === endpoint
                                    ? 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/30 shadow-md'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-fuchsia-400 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`rounded px-2 py-1 text-xs font-semibold ${endpoint.startsWith('GET')
                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                                                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                                                }`}
                                        >
                                            {endpoint.split(' ')[0]}
                                        </span>
                                        <span className="font-mono text-sm text-gray-900 dark:text-white">
                                            {endpoint.split(' ')[1]}
                                        </span>
                                    </div>
                                    <span className="text-gray-400">
                                        {selectedEndpoint === endpoint ? '▼' : '▶'}
                                    </span>
                                </div>
                                {endpoints[endpoint] && (
                                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        {endpoints[endpoint].description}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appointments Endpoints */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Appointments
                    </h3>
                    <div className="space-y-2">
                        {['GET /api/appointments', 'POST /api/appointments', 'PATCH /api/appointments', 'DELETE /api/appointments'].map(
                            (endpoint) => (
                                <button
                                    key={endpoint}
                                    onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint ? null : endpoint)}
                                    className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${selectedEndpoint === endpoint
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`rounded px-2 py-1 text-xs font-semibold ${endpoint.startsWith('GET')
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                                                    : endpoint.startsWith('POST')
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                        : endpoint.startsWith('PATCH')
                                                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400'
                                                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                                    }`}
                                            >
                                                {endpoint.split(' ')[0]}
                                            </span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-white">
                                                {endpoint.split(' ')[1]}
                                            </span>
                                        </div>
                                        <span className="text-gray-400">
                                            {selectedEndpoint === endpoint ? '▼' : '▶'}
                                        </span>
                                    </div>
                                    {endpoints[endpoint] && (
                                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {endpoints[endpoint].description}
                                        </div>
                                    )}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Availability Endpoints */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Availability
                    </h3>
                    <div className="space-y-2">
                        {['GET /api/availability', 'POST /api/availability', 'DELETE /api/availability'].map(
                            (endpoint) => (
                                <button
                                    key={endpoint}
                                    onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint ? null : endpoint)}
                                    className={`w-full text-left rounded-lg border px-4 py-3 transition-all ${selectedEndpoint === endpoint
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30 shadow-md'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-cyan-400 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`rounded px-2 py-1 text-xs font-semibold ${endpoint.startsWith('GET')
                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                                                    : endpoint.startsWith('POST')
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                                                    }`}
                                            >
                                                {endpoint.split(' ')[0]}
                                            </span>
                                            <span className="font-mono text-sm text-gray-900 dark:text-white">
                                                {endpoint.split(' ')[1]}
                                            </span>
                                        </div>
                                        <span className="text-gray-400">
                                            {selectedEndpoint === endpoint ? '▼' : '▶'}
                                        </span>
                                    </div>
                                    {endpoints[endpoint] && (
                                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {endpoints[endpoint].description}
                                        </div>
                                    )}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Endpoint Details */}
            {selectedEndpoint && endpoints[selectedEndpoint] && (
                <div className="space-y-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedEndpoint}
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Request
                            </h4>
                            <CodeBlock code={endpoints[selectedEndpoint].request} language="json" />
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Response
                            </h4>
                            <CodeBlock code={endpoints[selectedEndpoint].response} language="json" />
                        </div>

                        {endpoints[selectedEndpoint].errors && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Error Cases
                                </h4>
                                <CodeBlock code={endpoints[selectedEndpoint].errors} language="json" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}
