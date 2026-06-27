import { db } from './database'
import { auth } from './auth'

/* ------------------------------------------------------------------ */
/*  Datos de demostración                                              */
/*  IDs fijos para que la sesión persista entre reinicios del server. */
/* ------------------------------------------------------------------ */

const ID = {
    ana: 'aaaaaaaa-0000-0000-0000-000000000001',
    carlos: 'cccccccc-0000-0000-0000-000000000002',
    lucia: 'dddddddd-0000-0000-0000-000000000003',
    roberto: 'eeeeeeee-0000-0000-0000-000000000004',
    marcela: 'ffffffff-0000-0000-0000-000000000005',
    diego: 'bbbbbbbb-0000-0000-0000-000000000006',
    maria: 'mmmmmmmm-0000-0000-0000-000000000011',
    juan: 'jjjjjjjj-0000-0000-0000-000000000012',
    sofia: 'ssssssss-0000-0000-0000-000000000013',
} as const

type Duration = 30 | 60 | 90 | 120

interface ProfessionalSeed {
    id: string
    email: string
    name: string
    specialty: string
    bio: string
    rate: number
    days: number[]
    start: string
    end: string
    duration: Duration
    seed: string
}

const PASSWORD = 'Demo123!'
const avatar = (seed: string) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`

const professionals: ProfessionalSeed[] = [
    {
        id: ID.ana,
        email: 'ana.garcia@example.com',
        name: 'Dra. Ana García',
        specialty: 'Psicólogo',
        bio: 'Psicóloga clínica con 10 años de experiencia en terapia cognitivo-conductual. Especializada en ansiedad y depresión.',
        rate: 80,
        days: [1, 2, 3, 4, 5],
        start: '09:00',
        end: '17:00',
        duration: 60,
        seed: 'Ana',
    },
    {
        id: ID.carlos,
        email: 'carlos.mendez@example.com',
        name: 'Dr. Carlos Méndez',
        specialty: 'Médico',
        bio: 'Médico general con enfoque en medicina preventiva y atención primaria. 15 años acompañando a sus pacientes.',
        rate: 100,
        days: [1, 2, 3, 4, 5],
        start: '10:00',
        end: '18:00',
        duration: 30,
        seed: 'Carlos',
    },
    {
        id: ID.lucia,
        email: 'lucia.fernandez@example.com',
        name: 'Lic. Lucía Fernández',
        specialty: 'Nutricionista',
        bio: 'Nutricionista deportiva. Diseña planes de alimentación personalizados para mejorar tu energía y composición corporal.',
        rate: 60,
        days: [1, 3, 5],
        start: '08:00',
        end: '13:00',
        duration: 60,
        seed: 'Lucia',
    },
    {
        id: ID.roberto,
        email: 'roberto.silva@example.com',
        name: 'Ab. Roberto Silva',
        specialty: 'Abogado',
        bio: 'Abogado corporativo especializado en derecho laboral y contratos. Asesoría clara, sin tecnicismos innecesarios.',
        rate: 120,
        days: [2, 4],
        start: '14:00',
        end: '19:00',
        duration: 60,
        seed: 'Roberto',
    },
    {
        id: ID.marcela,
        email: 'marcela.rios@example.com',
        name: 'Marcela Ríos',
        specialty: 'Entrenador Personal',
        bio: 'Entrenadora personal certificada. Rutinas de fuerza y movilidad adaptadas a tu nivel, presenciales u online.',
        rate: 45,
        days: [1, 2, 3, 4, 5, 6],
        start: '07:00',
        end: '11:00',
        duration: 60,
        seed: 'Marcela',
    },
    {
        id: ID.diego,
        email: 'diego.torres@example.com',
        name: 'Lic. Diego Torres',
        specialty: 'Consultor',
        bio: 'Consultor de negocios para pymes. Estrategia, operaciones y crecimiento con foco en resultados medibles.',
        rate: 110,
        days: [1, 2, 3, 4, 5],
        start: '09:00',
        end: '13:00',
        duration: 90,
        seed: 'Diego',
    },
]

const clients = [
    { id: ID.maria, email: 'maria.lopez@example.com', name: 'María López', seed: 'Maria' },
    { id: ID.juan, email: 'juan.perez@example.com', name: 'Juan Pérez', seed: 'Juan' },
    { id: ID.sofia, email: 'sofia.ramirez@example.com', name: 'Sofía Ramírez', seed: 'Sofia' },
]

/* ------------------------------------------------------------------ */
/*  Helpers de fecha (relativas a hoy para que la demo nunca caduque) */
/* ------------------------------------------------------------------ */

function slot(daysFromNow: number, hour: number, minute: number, durationMin: number) {
    const start = new Date()
    start.setDate(start.getDate() + daysFromNow)
    start.setHours(hour, minute, 0, 0)
    const end = new Date(start)
    end.setMinutes(end.getMinutes() + durationMin)
    return { start_time: start.toISOString(), end_time: end.toISOString() }
}

type AppointmentSeed = {
    client: string
    professional: string
    title: string
    description?: string
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
    cancellation_reason?: string
    when: ReturnType<typeof slot>
}

const appointments: AppointmentSeed[] = [
    // Agenda de Ana (profesional) — cubre hoy / próximas / pendientes / pasadas
    {
        client: ID.maria,
        professional: ID.ana,
        title: 'Sesión de terapia',
        description: 'Seguimiento quincenal',
        status: 'confirmed',
        when: slot(0, 11, 0, 60),
    },
    {
        client: ID.juan,
        professional: ID.ana,
        title: 'Consulta psicológica',
        description: 'Primera sesión — evaluación inicial',
        status: 'pending',
        when: slot(1, 14, 0, 60),
    },
    {
        client: ID.sofia,
        professional: ID.ana,
        title: 'Sesión de terapia',
        description: 'Manejo de estrés',
        status: 'confirmed',
        when: slot(3, 9, 0, 60),
    },
    {
        client: ID.maria,
        professional: ID.ana,
        title: 'Sesión de terapia',
        description: 'Sesión completada',
        status: 'completed',
        when: slot(-4, 10, 0, 60),
    },
    {
        client: ID.juan,
        professional: ID.ana,
        title: 'Consulta psicológica',
        status: 'cancelled',
        cancellation_reason: 'El cliente reagendó para otra fecha.',
        when: slot(-12, 15, 0, 60),
    },
    // Carlos (médico)
    {
        client: ID.sofia,
        professional: ID.carlos,
        title: 'Chequeo general',
        description: 'Control anual',
        status: 'pending',
        when: slot(2, 10, 30, 30),
    },
    {
        client: ID.maria,
        professional: ID.carlos,
        title: 'Consulta médica',
        status: 'completed',
        when: slot(-6, 11, 0, 30),
    },
    // Lucía (nutrición)
    {
        client: ID.juan,
        professional: ID.lucia,
        title: 'Plan de alimentación',
        description: 'Definición de objetivos',
        status: 'confirmed',
        when: slot(4, 9, 0, 60),
    },
]

/* ------------------------------------------------------------------ */
/*  Seed                                                               */
/* ------------------------------------------------------------------ */

export async function seedDatabase() {
    db.reset()

    // Profesionales
    for (const p of professionals) {
        const created = await auth.signUp(p.email, PASSWORD, p.name, 'professional', p.id)
        if (created.success && created.session) {
            db.updateProfile(p.id, {
                specialty: p.specialty,
                bio: p.bio,
                hourly_rate: p.rate,
                avatar_url: avatar(p.seed),
            })
            for (const day of p.days) {
                db.createAvailability({
                    professional_id: p.id,
                    day_of_week: day,
                    start_time: p.start,
                    end_time: p.end,
                    appointment_duration: p.duration,
                })
            }
        }
    }

    // Clientes
    for (const c of clients) {
        const created = await auth.signUp(c.email, PASSWORD, c.name, 'client', c.id)
        if (created.success && created.session) {
            db.updateProfile(c.id, { avatar_url: avatar(c.seed) })
        }
    }

    // Citas de ejemplo
    for (const a of appointments) {
        db.createAppointment({
            client_id: a.client,
            professional_id: a.professional,
            title: a.title,
            description: a.description,
            start_time: a.when.start_time,
            end_time: a.when.end_time,
            status: a.status,
            cancellation_reason: a.cancellation_reason,
        })
    }

    console.log('✅ Base de datos de demo lista')
    console.log('📧 Cuentas de prueba (contraseña: Demo123!):')
    console.log('   Profesional: ana.garcia@example.com')
    console.log('   Cliente:     maria.lopez@example.com')
}

// Auto-seed al importar (modo demo).
// Se exporta la promesa para que las rutas de API puedan esperar a que los
// datos estén listos y evitar una condición de carrera en el primer request
// (p. ej. el primer login tras un arranque en frío).
export const seedReady: Promise<void> = seedDatabase().catch((err) => {
    console.error('Seed error:', err)
})
