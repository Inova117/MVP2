import { type Profile } from './mock-db/types'

// Mock client that mimics Supabase API
type Session = {
    user_id: string
    email: string
    role: 'client' | 'professional'
    profile?: Profile
}

type AuthResponse = {
    session: Session | null
    error?: string
}

class MockSupabaseClient {
    // Auth methods
    auth = {
        signUp: async (data: {
            email: string
            password: string
            options?: {
                data?: {
                    full_name: string
                    role: 'client' | 'professional'
                }
            }
        }): Promise<AuthResponse> => {
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                        fullName: data.options?.data?.full_name || '',
                        role: data.options?.data?.role || 'client',
                    }),
                })

                const result = await response.json()

                if (!response.ok) {
                    return { session: null, error: result.error }
                }

                return { session: result.session }
            } catch (error) {
                return { session: null, error: 'Network error' }
            }
        },

        signInWithPassword: async (data: {
            email: string
            password: string
        }): Promise<AuthResponse> => {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })

                const result = await response.json()

                if (!response.ok) {
                    return { session: null, error: result.error }
                }

                return { session: result.session }
            } catch (error) {
                return { session: null, error: 'Network error' }
            }
        },

        signOut: async (): Promise<{ error?: string }> => {
            try {
                await fetch('/api/auth/logout', { method: 'POST' })
                return {}
            } catch (error) {
                return { error: 'Network error' }
            }
        },

        getSession: async (): Promise<{ data: { session: Session | null } }> => {
            try {
                const response = await fetch('/api/auth/session')
                const result = await response.json()
                return { data: { session: result.session } }
            } catch (error) {
                return { data: { session: null } }
            }
        },
    }

    // Database query builder
    from(table: string) {
        return new QueryBuilder(table)
    }
}

class QueryBuilder {
    private table: string
    private filters: Record<string, unknown> = {}
    private orderField?: string
    private orderAsc = true
    private limitCount?: number

    constructor(table: string) {
        this.table = table
    }

    select(_fields = '*') {
        return this
    }

    eq(field: string, value: unknown) {
        this.filters[field] = value
        return this
    }

    order(field: string, options?: { ascending?: boolean }) {
        this.orderField = field
        this.orderAsc = options?.ascending !== false
        return this
    }

    limit(count: number) {
        this.limitCount = count
        return this
    }

    async execute() {
        const params = new URLSearchParams()

        // Add filters as query params
        Object.entries(this.filters).forEach(([key, value]) => {
            params.append(key, String(value))
        })

        const url = `/api/${this.table}?${params.toString()}`

        try {
            const response = await fetch(url)
            const result = await response.json()

            if (!response.ok) {
                return { data: null, error: result.error }
            }

            let data = result.data

            // Apply ordering (client-side for simplicity)
            if (this.orderField && Array.isArray(data)) {
                data.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
                    const aVal = a[this.orderField!] as string | number
                    const bVal = b[this.orderField!] as string | number
                    if (aVal < bVal) return this.orderAsc ? -1 : 1
                    if (aVal > bVal) return this.orderAsc ? 1 : -1
                    return 0
                })
            }

            // Apply limit
            if (this.limitCount && Array.isArray(data)) {
                data = data.slice(0, this.limitCount)
            }

            return { data, error: null }
        } catch (error) {
            return { data: null, error: 'Network error' }
        }
    }

    async insert(data: Record<string, unknown> | Record<string, unknown>[]) {
        try {
            const response = await fetch(`/api/${this.table}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                return { data: null, error: result.error }
            }

            return { data: result.data, error: null }
        } catch (_error) {
            return { data: null, error: 'Network error' }
        }
    }

    async update(data: Record<string, unknown>) {
        try {
            const params = new URLSearchParams()
            Object.entries(this.filters).forEach(([key, value]) => {
                params.append(key, String(value))
            })

            const response = await fetch(`/api/${this.table}?${params.toString()}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                return { data: null, error: result.error }
            }

            return { data: result.data, error: null }
        } catch (_error) {
            return { data: null, error: 'Network error' }
        }
    }

    async delete() {
        try {
            const params = new URLSearchParams()
            Object.entries(this.filters).forEach(([key, value]) => {
                params.append(key, String(value))
            })

            const response = await fetch(`/api/${this.table}?${params.toString()}`, {
                method: 'DELETE',
            })

            const result = await response.json()

            if (!response.ok) {
                return { data: null, error: result.error }
            }

            return { data: result.data, error: null }
        } catch (_error) {
            return { data: null, error: 'Network error' }
        }
    }

    // Alias for execute
    then(resolve: (value: unknown) => void, reject?: (error: unknown) => void) {
        return this.execute().then(resolve, reject)
    }
}

// Export singleton instance
export const createClient = () => new MockSupabaseClient()
