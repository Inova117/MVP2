# 📋 PRODUCT SPECIFICATION - MVP #2: Plataforma de Agendamiento

**Responsabilidad**: Product Manager  
**Enfoque**: QUÉ construir, POR QUÉ, CUÁNDO

---

## 📑 Tabla de Contenidos

1. [Business Context](#-business-context)
2. [Problem Statement](#-problem-statement)
3. [Solution Overview](#-solution-overview)
4. [Target Users](#-target-users)
5. [Features (MoSCoW)](#-features-moscow)
6. [User Stories](#-user-stories)
7. [Acceptance Criteria](#-acceptance-criteria-por-feature)
8. [Success Metrics](#-success-metrics--kpis)
9. [Timeline & Sprints](#-timeline--sprints)
10. [Out of Scope](#-out-of-scope-v10)
11. [Risks & Assumptions](#-risks--assumptions)

---

## 🎯 Business Context

### Objetivo del MVP
Crear una **plataforma de agendamiento** que permita a profesionales (médicos, abogados, consultores) gestionar sus citas y a clientes reservarlas de forma simple y eficiente.

### Problema de Negocio
- **40% de profesionales independientes** usan agendas de papel o Excel
- **Promedio 2.5 horas/semana** perdidas en llamadas/emails coordinando citas
- **15-20% no-shows** por falta de recordatorios
- **$1,200/mes** en ingresos perdidos por mala gestión

### Oportunidad
- Mercado: $4.2B globally (appointment scheduling software)
- TAM LATAM: ~500K profesionales independientes
- Competencia usa freemium ($0-50/mes), nosotros: demostrar valor premium ($100/mes)

### Success Goal
- **10 profesionales** usando activamente en 30 días
- **Promedio 15 citas/semana** por profesional
- **NPS > 50**

**Referencia Técnica**: Ver `ENGINEERING.md` para arquitectura que soporta estos objetivos

---

## ❌ Problem Statement

### Usuario: Profesional Independiente

**Pains**:
1. Pierde tiempo coordinando citas por teléfono/WhatsApp
2. Double-booking frecuente (misma hora, 2 clientes)
3. No-shows ~20% (sin recordatorios)
4. No puede acceder a agenda fuera de oficina
5. Difícil ver disponibilidad global

**Current Alternatives**:
- Google Calendar (no diseñado para bookings)
- Excel/papel (manual, propenso a errores)
- Calendly (demasiado simple, no CRM)

### Usuario: Cliente

**Pains**:
1. Necesita llamar en horario de oficina
2. Espera en hold promedio 5 min
3. Olvida hora exacta de cita
4. No puede reprogramar fácilmente
5. No tiene historial de citas

---

## ✅ Solution Overview

Plataforma web que permite:

### Para Profesionales:
- ✅ Calendario visual con disponibilidad
- ✅ Aceptar/rechazar solicitudes de cita
- ✅ Ver historial de clientes
- ✅ Dashboard con métricas (citas/semana, cancellations, etc.)

### Para Clientes:
- ✅ Ver disponibilidad en tiempo real
- ✅ Reservar cita en 3 clicks
- ✅ Recibir confirmación por email
- ✅ Ver historial de citas
- ✅ Cancelar/reprogramar (hasta 24h antes)

**Diferenciador**: 
- Simple como Calendly
- Poderoso como Acuity
- Precio accesible para LATAM

---

## 👥 Target Users

### Persona 1: Dr. Ana García (Profesional)
- **Rol**: Psicóloga independiente
- **Edad**: 35-45
- **Tech savviness**: Media
- **# Citas/semana**: 20-25
- **Pain principal**: Double-booking, recordatorios manuales
- **Willingness to pay**: $80-120/mes

### Persona 2: Carlos Méndez (Cliente)
- **Edad**: 25-40
- **Ocupación**: Empleado corporativo
- **Tech savviness**: Alta
- **Frecuencia**: 2-4 citas/mes
- **Pain principal**: Necesita reservar fuera de horario de oficina
- **Expectativa**: Proceso < 2 min

---

## 🎨 Features (MoSCoW)

### ✅ **MUST-HAVE** (Sprint 1 - Semana 1-2)

#### Feature #1: User Authentication
**Value**: Base para todo el sistema  
**Effort**: 1 día  
**Implementation**: Ver `ENGINEERING.md` → § 6.1

**User Story**: 
- Como profesional, necesito crear cuenta para gestionar mi agenda
- Como cliente, necesito crear cuenta para reservar citas

---

#### Feature #2: Professional Profile
**Value**: Permite que clientes encuentren al profesional correcto  
**Effort**: 1 día

**User Story**: 
Como profesional, quiero crear mi perfil con:
- Nombre, especialidad, bio
- Foto profesional
- Horario de atención (L-V 9am-6pm)
- Duración de cita estándar (30/60 min)

**Implementation**: Ver `ENGINEERING.md` → § 6.2

---

#### Feature #3: Calendar View (Professional)
**Value**: Core feature, visualización de agenda  
**Effort**: 2 días

**User Story**:
Como profesional, quiero ver mi calendario semanal con:
- Vista semanal/día
- Citas confirmadas (green)
- Citas pendientes (yellow)
- Bloques de tiempo libre (white)
- Filtros (todos/pendientes/confirmados)

**Implementation**: Ver `ENGINEERING.md` → § 6.3

---

#### Feature #4: Book Appointment (Client)
**Value**: Core feature, razón principal del MVP  
**Effort**: 3 días

**User Story**:
Como cliente, quiero reservar una cita:
1. Buscar profesional por nombre/especialidad
2. Ver disponibilidad en calendario
3. Seleccionar fecha/hora
4. Agregar nota/razón (opcional)
5. Confirmar reserva
6. Recibir confirmación por email

**Implementation**: Ver `ENGINEERING.md` → § 6.4

---

#### Feature #5: Manage Appointments (Both)
**Value**: Permite gestionar lifecycle completo de cita  
**Effort**: 2 días

**User Story**:
- Como profesional: Ver lista de citas, aceptar/rechazar, confirmar
- Como cliente: Ver mis citas, cancelar (24h+ antes), reprogramar

**Implementation**: Ver `ENGINEERING.md` → § 6.5

---

### 🟡 **SHOULD-HAVE** (Sprint 2 - Post-MVP)

#### Feature #6: Email Notifications
- Confirmación de reserva
- Recordatorio 24h antes
- Cambios/cancelaciones

#### Feature #7: Dashboard Analytics
- Profesional: Citas/semana, revenue estimado, no-show rate
- Cliente: Gasto total, próximas citas

#### Feature #8: Reviews & Ratings
- Clientes pueden calificar al profesional post-cita
- Promedio visible en perfil

---

### 🔵 **COULD-HAVE** (V2)

- Google Calendar sync
- Payment integration (Stripe/MercadoPago)
- Waitlist para horarios completos
- Multi-timezone support

---

### 🔴 **WON'T-HAVE** (V1)

- Mobile app nativa (solo responsive web)
- Video call integration
- Multi-language (solo Spanish)
- Custom branding para profesionales
- Team accounts (solo individual)

---

##📝 User Stories

### Epic 1: Authentication

**US-1.1**: Como nuevo usuario, quiero registrarme con email/password  
**US-1.2**: Como usuario existente, quiero login  
**US-1.3**: Como usuario, quiero recuperar mi password si lo olvido  
**US-1.4**: Como usuario, quiero cerrar sesión

---

### Epic 2: Professional Setup

**US-2.1**: Como profesional, quiero completar mi perfil (nombre, especialidad, bio)  
**US-2.2**: Como profesional, quiero subir foto de perfil  
**US-2.3**: Como profesional, quiero configurar mi horario de atención  
**US-2.4**: Como profesional, quiero definir duración estándar de cita (30/60 min)

---

### Epic 3: Booking Flow

**US-3.1**: Como cliente, quiero buscar profesionales por especialidad  
**US-3.2**: Como cliente, quiero ver perfil del profesional (bio, reviews)  
**US-3.3**: Como cliente, quiero ver disponibilidad en calendario  
**US-3.4**: Como cliente, quiero seleccionar fecha/hora disponible  
**US-3.5**: Como cliente, quiero agregar nota sobre razón de cita  
**US-3.6**: Como cliente, quiero recibir confirmación por email

---

### Epic 4: Appointment Management

**US-4.1**: Como profesional, quiero ver todas mis citas en lista  
**US-4.2**: Como profesional, quiero aceptar/rechazar solicitudes pendientes  
**US-4.3**: Como profesional, quiero marcar cita como completada  
**US-4.4**: Como cliente, quiero ver historial de mis citas  
**US-4.5**: Como cliente, quiero cancelar cita (24h+ antes)  
**US-4.6**: Como cliente, quiero reprogramar cita

---

## ✅ Acceptance Criteria (por Feature)

### Feature #1: User Authentication

**AC-1.1**: Signup
- [ ] Form tiene campos: email, password, full name, role (client/professional)
- [ ] Password debe tener min 8 caracteres, 1 uppercase, 1 número
- [ ] Email debe ser válido (formato email)
- [ ] Después de signup exitoso, redirect a /dashboard
- [ ] Error mostrado si email ya existe

**AC-1.2**: Login  
- [ ] Form tiene: email, password
- [ ] Login exitoso → redirect a /dashboard
- [ ] Login fallido → mostrar error "Invalid credentials"
- [ ] Session persiste (refresh no logout)

**AC-1.3**: Protected Routes
- [ ] /dashboard requiere authentication
- [ ] /login no accesible si ya autenticado (redirect /dashboard)

**Implementation**: `ENGINEERING.md` → § 6.1

---

### Feature #2: Professional Profile

**AC-2.1**: Profile Creation
- [ ] Form tiene: full_name, specialty, bio, avatar_url
- [ ] Bio max 500 caracteres
- [ ] Specialty dropdown: Médico, Psicólogo, Abogado, Consultor, Otro
- [ ] Avatar upload funciona (max 2MB, jpg/png)
- [ ] Profile saved → mostrar success message

**AC-2.2**: Availability Settings
- [ ] Puede definir horario L-V: start_hour, end_hour (9am-6pm default)
- [ ] Puede definir duración cita: 30/60 min (dropdown)
- [ ] Settings saved → reflejado en calendar view

**Implementation**: `ENGINEERING.md` → § 6.2

---

### Feature #3: Calendar View

**AC-3.1**: Weekly View
- [ ] Muestra 7 días (L-D)
- [ ] Horas de 8am-8pm
- [ ] Citas confirmadas: green background
- [ ] Citas pendientes: yellow background
- [ ] Slots libres: white background, clickable

**AC-3.2**: Appointment Details
- [ ] Click en cita → modal con detalles (cliente, hora, nota)
- [ ] Modal tiene botones: Confirmar, Rechazar, Completar
- [ ] Acciones reflejan en UI inmediatamente

**AC-3.3**: Filters
- [ ] Dropdown: Todas / Pendientes / Confirmadas / Completadas
- [ ] Filter actualiza vista sin reload

**Implementation**: `ENGINEERING.md` → § 6.3

---

### Feature #4: Book Appointment

**AC-4.1**: Search Professionals
- [ ] Input de búsqueda por nombre/especialidad
- [ ] Muestra lista de profesionales (max 10)
- [ ] Cada card muestra: nombre, especialidad, rating (placeholder)

**AC-4.2**: View Availability
- [ ] Click profesional → ver calendario
- [ ] Solo slots disponibles son clicables
- [ ] Slots pasados: disabled (gray)
- [ ] Slots ocupados: disabled (red)

**AC-4.3**: Booking Flow
- [ ] Select slot → modal de confirmación
- [ ] Modal tiene: fecha, hora, duración, input para nota
- [ ] Button "Confirm Booking"
- [ ] Después de booking → redirect a /dashboard/appointments
- [ ] Email de confirmación enviado (verificar con test email)

**AC-4.4**: Edge Cases
- [ ] Si slot ya tomado (race condition) → error "Slot no longer available"
- [ ] No puede reservar múltiples citas al mismo tiempo

**Implementation**: `ENGINEERING.md` → § 6.4

---

### Feature #5: Manage Appointments

**AC-5.1**: Appointments List (Client)
- [ ] Tabla con: profesional, fecha, hora, status
- [ ] Status colors: pending (yellow), confirmed (green), completed (gray), cancelled (red)
- [ ] Acciones: Cancel (si >24h), Reschedule

**AC-5.2**: Cancel Appointment
- [ ] Button "Cancel" solo si >24h antes de cita
- [ ] Confirmation modal: "Are you sure?"
- [ ] Después de cancel → cita marcada "cancelled" en DB
- [ ] Email notificación a profesional

**AC-5.3**: Appointments List (Professional)
- [ ] Tabla con: cliente, fecha, hora, status, nota
- [ ] Acciones: Accept, Reject (si pending), Complete (si confirmed, después de hora)
- [ ] Real-time updates (si otro usuario cancela,ve en su lista)

**Implementation**: `ENGINEERING.md` → § 6.5

---

## 📊 Success Metrics & KPIs

### North Star Metric
**Citas completadas por semana**  
Target: 50+ citas/semana en primeros 30 días

### Primary Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Signup Conversion** | >40% | Visits → Signups |
| **Booking Completion Rate** | >70% | Starts booking → Completes |
| **Time to First Booking** | <5 min | Signup → First confirmed booking |
| **No-Show Rate** | <10% | (No-shows / Total confirmed) |
| **Professional Retention (30-day)** | >60% | Active after 30 days |

### Secondary Metrics

- **DAU/MAU ratio**: >30% (engagement)
- **Avg bookings per client**: >2/month
- **Avg bookings per professional**: >15/week
- **Email confirmation delivery**: >95%

### How to Measure

**Dashboard Analytics** (implementar en Sprint 2):
- Supabase analytics
- Custom events (booking_started, booking_completed, etc.)
- Weekly reports automáticos

**Implementation**: Ver `ENGINEERING.md` → § 7 para analytics setup

---

## 📅 Timeline & Sprints

### Sprint 1: Foundation (Semana 1)
**Días 1-7**

**Día 1-2**: Setup + Authentication
- [x] Project setup (ENGINEERING.md § 3)
- [ ] Feature #1: Auth implementation

**Día 3-4**: Professional Profile + Calendar
- [ ] Feature #2: Profile setup
- [ ] Feature #3: Calendar view (80% complete)

**Día 5-7**: Booking Flow
- [ ] Feature #4: Book appointment (complete)
- [ ] Feature #3: Calendar view (100%)

**Sprint Goal**: Professional puede ver su calendario, cliente puede reservar cita

---

### Sprint 2: Polish & Launch (Semana 2)

**Día 8-9**: Manage Appointments
- [ ] Feature #5: Manage appointments (both roles)
- [ ] Email notifications (basic)

**Día 10-11**: QA & Bug Fixes
- [ ] Ejecutar acceptance criteria todos los features
- [ ] Fix bugs críticos
- [ ] Responsive testing (mobile/tablet)
- [ ] Cross-browser testing

**Día 12-13**: Performance & Security
- [ ] Lighthouse > 90
- [ ] npm audit clean
- [ ] RLS policies verified
- [ ] Load testing (50 concurrent users)

**Día 14**: Deploy & Documentation
- [ ] Production deploy
- [ ] User guide
- [ ] Onboarding docs para primeros 10 profesionales

**Sprint Goal**: MVP production-ready, 10 profesionales onboarded

---

## 🚫 Out of Scope (V1.0)

### No Implementar en MVP

1. **Payments**: 
   - Por qué: Requiere compliance (PCI-DSS), agrega complejidad
   - Workaround: Profesionales cobran offline

2. **Video Calls**:
   - Por qué: No es core value prop, complejo
   - Alternativa: Integrar con Zoom/Meet links (V2)

3. **Team Accounts**:
   - Por qué: Target es profesionales independientes
   - V2: Multi-user con roles

4. **Custom Branding**:
   - Por qué: Agrega complejidad UI
   - V2: White-label option

5. **Mobile App**:
   - Por qué: Responsive web es suficiente para MVP
   - Métricas: Si >50% traffic es mobile → considerar app

---

---

## 👥 User Testing Plan (Post-Build)

### Phase 1: Internal Alpha Testing

**Participants**: Team members + close contacts (5 people)  
**Duration**: 3 días (Día 12-14)  
**Goal**: Identify critical bugs, usability issues

**Test Scenarios**:
1. Complete signup → profile setup → first booking
2. Professional: Set availability → accept appointment → mark complete
3. Client: Search professional → book → cancel

**Success Criteria**:
- All scenarios completable without help
- No critical bugs (app crashes, data loss)
- < 3 usability issues per tester

**Feedback Collection**:
- Screen recording (Loom)
- Post-test survey (5 questions)
- 15min debrief call

---

### Phase 2: Beta Testing (Real Users)

**Participants**: 10 voluntarios (5 professionals + 5 clients)  
**Duration**: 7 días (Post-launch)  
**Goal**: Validate product-market fit, gather feature requests

**Recruitment**:
- LinkedIn outreach (target: psicólogos, consultores)
- Incentive: Free access for 3 months

**Test Tasks**:
- **Professionals**:
  1. Complete profile setup (bio, photo, rates)
  2. Configure availability (weekly schedule)
  3. Accept at least 3 bookings
  4. Use calendar view daily
- **Clients**:
  1. Find and book appointment
  2. Receive confirmation email
  3. Reschedule or cancel appointment

**Metrics to Track**:
- Time to first booking (target: < 5 min)
- Feature usage (most/least used)
- Drop-off points in booking flow
- NPS score (target: > 50)

**Feedback Collection**:
- Weekly check-in email
- End-of-week survey (10 questions)
- 1-on-1 interview with 3 users (30 min each)

---

### Phase 3: Iteration (Post-Beta)

**Based on feedback**:
1. Prioritize top 3 pain points
2. Quick fixes (< 2 days each)
3. Re-test with same users
4. Document learnings in `docs/USER_FEEDBACK.md`

**V1.1 Release Criteria**:
- All critical bugs fixed
- At least 2 UX improvements implemented
- NPS > 50 from beta testers

---

## ⚠️ Risks & Assumptions

### Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Double-booking bug** | Alto | Media | Thorough E2E testing, atomic transactions |
| **Email delivery fails** | Alto | Baja | Use proven service (Resend), fallback to SMS |
| **Poor professional adoption** | Alto | Media | Focus on UX, simple onboarding |
| **Slow booking flow** | Medio | Baja | Performance optimization, caching |
| **Security breach (data leak)** | Alto | Baja | RLS enforced, security audit, Sentry monitoring |

### Assumptions

1. ✅ **Profesionales tienen email activo** (validado: 95%+ en target market)
2. ✅ **Clientes prefieren booking online vs llamada** (validado: 76% prefer online)
3. ⚠️ **$100/mes es aceptable** (hypothesis, validar con primeros 10 users)
4. ⚠️ **Email confirmations son suficientes** (vs SMS/WhatsApp, validar)
5. ✅ **Web responsive suficiente** (60%mobile + 40% desktop según analytics)

### Validation Plan

Post-launch (30 días):
- Encuesta a primeros 10 profesionales (NPS, willingness to pay)
- Analizar metrics (booking completion rate, no-shows)
- User interviews (1 profesional, 3 clientes)
- Iterar en V1.1 según feedback

---

## 🔗 Cross-References

**Para implementación técnica**: Ver `ENGINEERING.md`

| Feature | Implementation Section |
|---------|----------------------|
| Authentication | § 6.1 |
| Professional Profile | § 6.2 |
| Calendar View | § 6.3 |
| Book Appointment | § 6.4 |
| Manage Appointments | § 6.5 |

**Para documentación adicional**: Ver `../docs/`

- `CONTEXT.md` - Problema detallado
- `DESIGN_SYSTEM.md` - UI/UX patterns
- `CHECKLIST.md` - QA pre-launch

---

**Última actualización**: 2026-01-13  
**Versión**: 1.0  
**Owner**: Product Manager  
**Next Review**: Post-Sprint 1 (Día 7)
