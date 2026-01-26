import { v4 as uuidv4 } from 'uuid'
import type {
    Profile,
    AvailabilitySetting,
    Appointment,
    User,
} from './types'

// In-memory database storage
class MockDatabase {
    private users: Map<string, User> = new Map()
    private profiles: Map<string, Profile> = new Map()
    private availabilitySettings: Map<string, AvailabilitySetting> = new Map()
    private appointments: Map<string, Appointment> = new Map()

    // Users table
    createUser(email: string, passwordHash: string, id?: string): User {
        const userId = id || uuidv4()
        const user: User = {
            id: userId,
            email,
            password_hash: passwordHash,
            created_at: new Date().toISOString(),
        }
        this.users.set(userId, user)
        return user
    }

    getUserByEmail(email: string): User | undefined {
        return Array.from(this.users.values()).find((u) => u.email === email)
    }

    getUserById(id: string): User | undefined {
        return this.users.get(id)
    }

    // Profiles table
    createProfile(data: Omit<Profile, 'created_at' | 'updated_at'>): Profile {
        const now = new Date().toISOString()
        const profile: Profile = {
            ...data,
            created_at: now,
            updated_at: now,
        }
        this.profiles.set(data.id, profile)
        return profile
    }

    getProfile(id: string): Profile | undefined {
        return this.profiles.get(id)
    }

    getProfileByEmail(email: string): Profile | undefined {
        return Array.from(this.profiles.values()).find((p) => p.email === email)
    }

    getAllProfiles(): Profile[] {
        return Array.from(this.profiles.values())
    }

    getProfessionals(): Profile[] {
        return Array.from(this.profiles.values()).filter(
            (p) => p.role === 'professional'
        )
    }

    updateProfile(id: string, data: Partial<Profile>): Profile | null {
        const profile = this.profiles.get(id)
        if (!profile) return null

        const updated: Profile = {
            ...profile,
            ...data,
            id: profile.id, // Prevent ID change
            created_at: profile.created_at, // Prevent created_at change
            updated_at: new Date().toISOString(),
        }
        this.profiles.set(id, updated)
        return updated
    }

    // Availability Settings table
    createAvailability(
        data: Omit<AvailabilitySetting, 'id' | 'created_at'>
    ): AvailabilitySetting {
        const id = uuidv4()
        const setting: AvailabilitySetting = {
            id,
            ...data,
            created_at: new Date().toISOString(),
        }
        this.availabilitySettings.set(id, setting)
        return setting
    }

    getAvailabilityByProfessional(professionalId: string): AvailabilitySetting[] {
        return Array.from(this.availabilitySettings.values()).filter(
            (a) => a.professional_id === professionalId
        )
    }

    updateAvailability(
        id: string,
        data: Partial<AvailabilitySetting>
    ): AvailabilitySetting | null {
        const setting = this.availabilitySettings.get(id)
        if (!setting) return null

        const updated = { ...setting, ...data, id: setting.id }
        this.availabilitySettings.set(id, updated)
        return updated
    }

    deleteAvailability(id: string): boolean {
        return this.availabilitySettings.delete(id)
    }

    // Appointments table
    createAppointment(
        data: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>
    ): Appointment | null {
        // Check for overlapping appointments
        const hasOverlap = this.checkAppointmentOverlap(
            data.professional_id,
            data.start_time,
            data.end_time
        )
        if (hasOverlap) return null

        const id = uuidv4()
        const now = new Date().toISOString()
        const appointment: Appointment = {
            id,
            ...data,
            created_at: now,
            updated_at: now,
        }
        this.appointments.set(id, appointment)
        return appointment
    }

    getAppointment(id: string): Appointment | undefined {
        return this.appointments.get(id)
    }

    getAppointmentsByUser(userId: string): Appointment[] {
        return Array.from(this.appointments.values()).filter(
            (a) => a.client_id === userId || a.professional_id === userId
        )
    }

    getAppointmentsByProfessional(professionalId: string): Appointment[] {
        return Array.from(this.appointments.values()).filter(
            (a) => a.professional_id === professionalId
        )
    }

    getAppointmentsByClient(clientId: string): Appointment[] {
        return Array.from(this.appointments.values()).filter(
            (a) => a.client_id === clientId
        )
    }

    updateAppointment(
        id: string,
        data: Partial<Appointment>
    ): Appointment | null {
        const appointment = this.appointments.get(id)
        if (!appointment) return null

        const updated: Appointment = {
            ...appointment,
            ...data,
            id: appointment.id,
            created_at: appointment.created_at,
            updated_at: new Date().toISOString(),
        }
        this.appointments.set(id, updated)
        return updated
    }

    deleteAppointment(id: string): boolean {
        return this.appointments.delete(id)
    }

    // Helper: Check for appointment overlaps
    private checkAppointmentOverlap(
        professionalId: string,
        startTime: string,
        endTime: string,
        excludeId?: string
    ): boolean {
        const start = new Date(startTime)
        const end = new Date(endTime)

        return Array.from(this.appointments.values()).some((apt) => {
            if (apt.id === excludeId) return false
            if (apt.professional_id !== professionalId) return false
            if (apt.status === 'cancelled') return false

            const aptStart = new Date(apt.start_time)
            const aptEnd = new Date(apt.end_time)

            // Check for overlap
            return start < aptEnd && end > aptStart
        })
    }

    // Reset database (for testing)
    reset(): void {
        this.users.clear()
        this.profiles.clear()
        this.availabilitySettings.clear()
        this.appointments.clear()
    }
}

// Singleton instance
export const db = new MockDatabase()
