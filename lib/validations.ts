import { z } from 'zod'

// Authentication schemas
export const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain uppercase letter')
        .regex(/[0-9]/, 'Must contain number'),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    role: z.enum(['client', 'professional']),
})

export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>

// Profile schemas
export const updateProfileSchema = z.object({
    full_name: z.string().min(2).max(100).optional(),
    specialty: z
        .enum(['Médico', 'Psicólogo', 'Abogado', 'Consultor', 'Otro'])
        .optional(),
    bio: z.string().max(500).optional(),
    avatar_url: z.string().url().optional(),
    hourly_rate: z.number().min(0).optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

// Appointment schemas
export const createAppointmentSchema = z
    .object({
        professionalId: z.string().uuid(),
        title: z.string().min(3).max(100),
        description: z.string().max(500).optional(),
        startTime: z.string().datetime(),
        endTime: z.string().datetime(),
    })
    .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
        message: 'End time must be after start time',
    })

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>

// Availability schemas
export const createAvailabilitySchema = z.object({
    day_of_week: z.number().min(0).max(6),
    start_time: z.string().regex(/^\d{2}:\d{2}$/),
    end_time: z.string().regex(/^\d{2}:\d{2}$/),
    appointment_duration: z.union([z.literal(30), z.literal(60), z.literal(90), z.literal(120)]),
})

export type CreateAvailabilityInput = z.infer<typeof createAvailabilitySchema>
