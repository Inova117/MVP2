import type { Session, Profile, Appointment, AvailabilitySetting } from './types'
import { db } from './database'

// RLS Policy Engine - simulates Supabase Row Level Security
export class RLSEngine {
    // Profiles policies
    canSelectProfile(_session: Session | null, _profile: Profile): boolean {
        // Public - anyone can view profiles
        return true
    }

    canInsertProfile(session: Session | null, profile: Profile): boolean {
        // Users can only insert their own profile
        if (!session) return false
        return session.user_id === profile.id
    }

    canUpdateProfile(session: Session | null, profile: Profile): boolean {
        // Users can only update their own profile
        if (!session) return false
        return session.user_id === profile.id
    }

    // Availability Settings policies
    canSelectAvailability(
        _session: Session | null,
        _setting: AvailabilitySetting
    ): boolean {
        // Public - anyone can view availability
        return true
    }

    canModifyAvailability(
        session: Session | null,
        setting: AvailabilitySetting
    ): boolean {
        // Only the professional can modify their availability
        if (!session) return false
        const profile = db.getProfile(session.user_id)
        if (!profile || profile.role !== 'professional') return false
        return session.user_id === setting.professional_id
    }

    // Appointments policies
    canSelectAppointment(session: Session | null, appointment: Appointment): boolean {
        // Users can see appointments where they are client OR professional
        if (!session) return false
        return (
            session.user_id === appointment.client_id ||
            session.user_id === appointment.professional_id
        )
    }

    canInsertAppointment(
        session: Session | null,
        appointment: Partial<Appointment>
    ): boolean {
        // Only clients can create appointments
        if (!session) return false
        const profile = db.getProfile(session.user_id)
        if (!profile || profile.role !== 'client') return false
        // Must be creating appointment for themselves
        return session.user_id === appointment.client_id
    }

    canUpdateAppointment(
        session: Session | null,
        appointment: Appointment,
        updates: Partial<Appointment>
    ): boolean {
        if (!session) return false

        const isClient = session.user_id === appointment.client_id
        const isProfessional = session.user_id === appointment.professional_id

        if (!isClient && !isProfessional) return false

        // Clients can only cancel
        if (isClient) {
            const allowedUpdates = ['status', 'cancellation_reason']
            const updateKeys = Object.keys(updates)
            const onlyAllowedUpdates = updateKeys.every((key) =>
                allowedUpdates.includes(key)
            )
            if (!onlyAllowedUpdates) return false
            if (updates.status && updates.status !== 'cancelled') return false
        }

        // Professionals can confirm, complete, or cancel
        if (isProfessional) {
            if (updates.status) {
                const allowedStatuses = ['confirmed', 'completed', 'cancelled']
                if (!allowedStatuses.includes(updates.status)) return false
            }
        }

        return true
    }

    canDeleteAppointment(session: Session | null, appointment: Appointment): boolean {
        // Only clients can delete their own pending appointments
        if (!session) return false
        return (
            session.user_id === appointment.client_id &&
            appointment.status === 'pending'
        )
    }

    // Filter arrays based on RLS
    filterProfiles(session: Session | null, profiles: Profile[]): Profile[] {
        return profiles.filter((p) => this.canSelectProfile(session, p))
    }

    filterAppointments(
        session: Session | null,
        appointments: Appointment[]
    ): Appointment[] {
        return appointments.filter((a) => this.canSelectAppointment(session, a))
    }

    filterAvailability(
        session: Session | null,
        settings: AvailabilitySetting[]
    ): AvailabilitySetting[] {
        return settings.filter((s) => this.canSelectAvailability(session, s))
    }
}

// Singleton instance
export const rls = new RLSEngine()
