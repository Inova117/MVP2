// TypeScript types for our mock database
export interface Profile {
    id: string
    email: string
    full_name: string
    avatar_url?: string
    role: 'client' | 'professional'
    specialty?: string
    bio?: string
    hourly_rate?: number
    created_at: string
    updated_at: string
}

export interface AvailabilitySetting {
    id: string
    professional_id: string
    day_of_week: number // 0=Sunday, 6=Saturday
    start_time: string // "09:00"
    end_time: string // "17:00"
    appointment_duration: 30 | 60 | 90 | 120
    created_at: string
}

export interface Appointment {
    id: string
    client_id: string
    professional_id: string
    title: string
    description?: string
    start_time: string // ISO datetime
    end_time: string // ISO datetime
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
    cancellation_reason?: string
    created_at: string
    updated_at: string
}

export interface User {
    id: string
    email: string
    password_hash: string
    created_at: string
}

export interface Session {
    user_id: string
    email: string
    role: 'client' | 'professional'
}
