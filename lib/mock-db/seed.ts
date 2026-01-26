import { db } from './database'
import { auth } from './auth'

// Seed demo data
export async function seedDatabase() {
    // Reset database
    db.reset()

    // Fixed UUIDs for demo users (so they persist across server restarts)
    const DEMO_IDS = {
        ana: 'aaaaaaaa-0000-0000-0000-000000000001',
        carlos: 'cccccccc-0000-0000-0000-000000000002',
        maria: 'mmmmmmmm-0000-0000-0000-000000000003',
        juan: 'jjjjjjjj-0000-0000-0000-000000000004',
        sofia: 'ssssssss-0000-0000-0000-000000000005',
    }

    // Create professionals
    const professional1 = await auth.signUp(
        'ana.garcia@example.com',
        'Demo123!',
        'Dra. Ana García',
        'professional',
        DEMO_IDS.ana
    )

    if (professional1.success && professional1.session) {
        // Update professional profile
        db.updateProfile(professional1.session.user_id, {
            specialty: 'Psicóloga',
            bio: 'Psicóloga clínica con 10 años de experiencia en terapia cognitivo-conductual. Especializada en ansiedad y depresión.',
            hourly_rate: 80,
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
        })

        // Add availability (Monday-Friday, 9am-5pm)
        for (let day = 1; day <= 5; day++) {
            db.createAvailability({
                professional_id: professional1.session.user_id,
                day_of_week: day,
                start_time: '09:00',
                end_time: '17:00',
                appointment_duration: 60,
            })
        }
    }

    const professional2 = await auth.signUp(
        'carlos.mendez@example.com',
        'Demo123!',
        'Dr. Carlos Méndez',
        'professional',
        DEMO_IDS.carlos
    )

    if (professional2.success && professional2.session) {
        db.updateProfile(professional2.session.user_id, {
            specialty: 'Médico',
            bio: 'Médico general con enfoque en medicina preventiva y atención primaria. 15 años de experiencia.',
            hourly_rate: 100,
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        })

        // Add availability (Monday-Friday, 10am-6pm)
        for (let day = 1; day <= 5; day++) {
            db.createAvailability({
                professional_id: professional2.session.user_id,
                day_of_week: day,
                start_time: '10:00',
                end_time: '18:00',
                appointment_duration: 30,
            })
        }
    }

    // Create clients
    const client1 = await auth.signUp(
        'maria.lopez@example.com',
        'Demo123!',
        'María López',
        'client',
        DEMO_IDS.maria
    )

    if (client1.success && client1.session) {
        db.updateProfile(client1.session.user_id, {
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        })
    }

    const client2 = await auth.signUp(
        'juan.perez@example.com',
        'Demo123!',
        'Juan Pérez',
        'client',
        DEMO_IDS.juan
    )

    if (client2.success && client2.session) {
        db.updateProfile(client2.session.user_id, {
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
        })
    }

    const client3 = await auth.signUp(
        'sofia.ramirez@example.com',
        'Demo123!',
        'Sofía Ramírez',
        'client',
        DEMO_IDS.sofia
    )

    if (client3.success && client3.session) {
        db.updateProfile(client3.session.user_id, {
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
        })
    }

    // Create sample appointments
    if (
        professional1.success &&
        professional1.session &&
        client1.success &&
        client1.session
    ) {
        // Confirmed appointment
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(10, 0, 0, 0)
        const tomorrowEnd = new Date(tomorrow)
        tomorrowEnd.setHours(11, 0, 0, 0)

        db.createAppointment({
            client_id: client1.session.user_id,
            professional_id: professional1.session.user_id,
            title: 'Sesión de terapia',
            description: 'Primera sesión - evaluación inicial',
            start_time: tomorrow.toISOString(),
            end_time: tomorrowEnd.toISOString(),
            status: 'confirmed',
        })

        // Pending appointment
        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)
        nextWeek.setHours(14, 0, 0, 0)
        const nextWeekEnd = new Date(nextWeek)
        nextWeekEnd.setHours(15, 0, 0, 0)

        if (client2.success && client2.session) {
            db.createAppointment({
                client_id: client2.session.user_id,
                professional_id: professional1.session.user_id,
                title: 'Consulta psicológica',
                description: 'Seguimiento mensual',
                start_time: nextWeek.toISOString(),
                end_time: nextWeekEnd.toISOString(),
                status: 'pending',
            })
        }
    }

    console.log('✅ Mock database seeded with demo data')
    console.log('📧 Demo accounts:')
    console.log('   Professional 1: ana.garcia@example.com / Demo123!')
    console.log('   Professional 2: carlos.mendez@example.com / Demo123!')
    console.log('   Client 1: maria.lopez@example.com / Demo123!')
    console.log('   Client 2: juan.perez@example.com / Demo123!')
    console.log('   Client 3: sofia.ramirez@example.com / Demo123!')
}

// Auto-seed on import (for demo purposes)
seedDatabase().catch(console.error)
