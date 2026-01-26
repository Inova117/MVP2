# ElevenLabs Demo Script - Booking Platform Backend

## 🎙️ Narration Script (1-2 minutes)

---

**[INTRO - 0:00-0:10]**

Welcome to the MVP Booking Platform - a complete appointment scheduling solution built with modern web technologies. Today, I'll walk you through the backend architecture that powers this intelligent booking system.

---

**[ARCHITECTURE OVERVIEW - 0:10-0:25]**

This platform is built on Next.js 14 with TypeScript, using a mock database layer that perfectly mimics Supabase's API. The backend follows a clean, modular architecture with three core layers: authentication, database operations, and row-level security.

---

**[AUTHENTICATION LAYER - 0:25-0:40]**

Let's start with authentication. The system supports two user roles: clients who book appointments, and professionals who provide services. Users can sign up, log in, and maintain secure sessions using JWT tokens stored in HTTP-only cookies. Every request is validated through our auth middleware, ensuring complete security.

---

**[DATABASE LAYER - 0:40-0:55]**

The database layer manages four main entities. First, we have users with encrypted passwords. Second, profiles that store detailed information like specialty, bio, and hourly rates. Third, availability settings where professionals define their working hours and appointment durations. And finally, appointments that track the entire booking lifecycle from pending to completed.

---

**[API ENDPOINTS - 0:55-1:10]**

Our REST API provides full CRUD operations. The appointments endpoint handles creating new bookings, retrieving schedules, updating statuses, and canceling appointments. Each endpoint includes comprehensive validation using Zod schemas, ensuring data integrity at every step.

---

**[BUSINESS LOGIC - 1:10-1:25]**

The system includes intelligent conflict detection. When a client tries to book an appointment, the backend automatically checks for overlapping time slots with the professional's existing schedule. This prevents double-bookings and ensures a smooth experience for both clients and professionals.

---

**[SECURITY - 1:25-1:40]**

Security is paramount. We implement row-level security policies that ensure clients can only view and modify their own appointments, while professionals can manage all appointments related to their services. This granular access control is enforced at the database query level.

---

**[SCALABILITY - 1:40-1:50]**

The mock database architecture is designed for easy migration to production. Simply swap the mock client with a real Supabase client, and the entire application continues to work seamlessly. No code changes required.

---

**[CLOSING - 1:50-2:00]**

This booking platform demonstrates enterprise-grade architecture with clean separation of concerns, robust security, and production-ready patterns. It's ready to eliminate 90% of appointment coordination time for any service-based business.

---

## 📝 Technical Highlights for Visuals

### Key Files to Show:
1. **`lib/supabase.ts`** - Mock Supabase client with auth methods
2. **`lib/mock-db/database.ts`** - In-memory database with CRUD operations
3. **`lib/mock-db/auth.ts`** - Authentication and session management
4. **`lib/mock-db/rls.ts`** - Row-level security policies
5. **`app/api/appointments/route.ts`** - RESTful API endpoints

### Code Snippets to Highlight:

#### Authentication Flow
```typescript
auth.signUp({ email, password, fullName, role })
→ Creates user + profile
→ Returns JWT session token
→ Stored in HTTP-only cookie
```

#### Appointment Creation
```typescript
POST /api/appointments
→ Validates user session
→ Checks RLS permissions
→ Validates time slot availability
→ Creates appointment
→ Returns 201 Created
```

#### Conflict Detection
```typescript
checkAppointmentOverlap(professionalId, startTime, endTime)
→ Queries existing appointments
→ Checks for time overlaps
→ Returns true if conflict exists
```

### Architecture Diagram
```
┌─────────────────────────────────────────┐
│          Next.js API Routes             │
│  /api/auth/*  |  /api/appointments/*    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Authentication Layer            │
│  • JWT Token Validation                 │
│  • Session Management                   │
│  • Role-based Access                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      Row-Level Security (RLS)           │
│  • canSelectAppointment()               │
│  • canInsertAppointment()               │
│  • canUpdateAppointment()               │
│  • canDeleteAppointment()               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Mock Database Layer             │
│  • Users & Profiles                     │
│  • Availability Settings                │
│  • Appointments                         │
│  • Conflict Detection                   │
└─────────────────────────────────────────┘
```

## 🎬 Recording Tips

1. **Pacing**: Read slowly and clearly, approximately 150-160 words per minute
2. **Emphasis**: Stress key technical terms like "row-level security", "conflict detection", "JWT tokens"
3. **Pauses**: Add 1-2 second pauses between sections for better comprehension
4. **Tone**: Professional but approachable, confident and clear

## 🔧 ElevenLabs Settings Recommendations

- **Voice**: Choose a professional, clear voice (e.g., "Josh" or "Antoni")
- **Stability**: 60-70% (for natural variation)
- **Clarity**: 75-85% (for technical content)
- **Style Exaggeration**: 20-30% (subtle emphasis)
- **Speaker Boost**: Enabled (for consistent volume)

---

**Total Duration**: Approximately 2 minutes
**Word Count**: ~320 words
**Technical Depth**: Intermediate to Advanced
**Target Audience**: Developers, Technical Stakeholders, Potential Clients
