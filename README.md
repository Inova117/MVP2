# MVP #2 - Plataforma de Agendamiento

> **Status**: 🔴 Not Started  
> **Timeline**: 2 semanas  
> **Target**: Clínicas, salones, consultorías, estudios  

---

## 📋 Contexto del Proyecto

Ver documentación completa en: [`docs/CONTEXT.md`](./docs/CONTEXT.md)

**Pitch**: "Elimina el 90% del tiempo en coordinación de citas"

**Problema**: Negocios de servicios personales pierden tiempo coordinando citas manualmente vía WhatsApp/teléfono, con cancelaciones de último minuto, no-shows, y falta de recordatorios automáticos.

**Solución**: Plataforma de agendamiento inteligente con calendario, confirmaciones automáticas, pagos integrados, y recordatorios.

---

## 🚀 Quick Start

### Para Desarrollo (Nueva Conversación)

Cuando empieces a trabajar en este MVP:

1. **Lee primero**:
   - [`docs/CONTEXT.md`](./docs/CONTEXT.md) - Contexto completo del proyecto
   - [`docs/METHODOLOGY.md`](./docs/METHODOLOGY.md) - Proceso de desarrollo a seguir
   - [`docs/CHECKLIST.md`](./docs/CHECKLIST.md) - QA checklist al finalizar

2. **Referencia al Design System**:
   - Paleta de colores: [`../_shared/DESIGN_SYSTEM.md`](../_shared/DESIGN_SYSTEM.md)
   - Tech Stack: [`../_shared/TECH_STACK.md`](../_shared/TECH_STACK.md)

3. **Sigue la metodología**:
   - Fase 1: Shaping (crear `docs/PROJECT_PITCH.md`)
   - Fase 2: Arquitectura
   - Fase 3: Build
   - Fase 4: Measure
   - Fase 5: Learn

---

## 📁 Estructura Esperada (Post-Desarrollo)

```
mvp-02-booking-platform/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utilities
├── public/                 # Static assets
├── supabase/              # Database
├── docs/                  # Documentación del proyecto
│   ├── CONTEXT.md         # 📖 Contexto y objetivos
│   ├── METHODOLOGY.md     # 🔄 Proceso de desarrollo
│   ├── CHECKLIST.md       # ✅ Pre-launch QA
│   ├── PROJECT_PITCH.md   # 🎯 Created in Shaping phase
│   ├── DATABASE_SCHEMA.md # 🗄️ Created in Architecture phase
│   └── screenshots/       # 📸 Created in Learn phase
├── README.md              # Este archivo
└── package.json           # Dependencies
```

---

## 🎯 Features Core (Must-Have)

- [ ] **Autenticación** - Login/register para clientes y negocios
- [ ] **Calendario inteligente** - Disponibilidad configurable, bloques de tiempo
- [ ] **Sistema de reservas** - Clientes pueden agendar citas
- [ ] **Confirmaciones automáticas** - Email + WhatsApp
- [ ] **Recordatorios** - 24h antes, 1h antes
- [ ] **Dashboard negocio** - Ver citas, cancelar, reagendar
- [ ] **Dashboard cliente** - Ver mis citas, historial
- [ ] **Pagos integrados** - MercadoPago/Stripe (opcional para MVP)

---

## 🛠️ Tech Stack (Pre-Aprobado)

Ver [`../_shared/TECH_STACK.md`](../_shared/TECH_STACK.md) para detalles completos.

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **Deployment**: Vercel
- **Notifications**: Resend (Email) + Twilio (WhatsApp opcional)
- **Payments**: MercadoPago (LATAM)

---

## 📚 Documentación de Referencia

### Específica de este proyecto:
- [`docs/CONTEXT.md`](./docs/CONTEXT.md) - **Empieza aquí**
- [`docs/METHODOLOGY.md`](./docs/METHODOLOGY.md) - Proceso a seguir
- [`docs/CHECKLIST.md`](./docs/CHECKLIST.md) - Validación final

### Compartida (Framework):
- [`../_shared/DESIGN_SYSTEM.md`](../_shared/DESIGN_SYSTEM.md) - Colores, tipografía, componentes
- [`../_shared/TECH_STACK.md`](../_shared/TECH_STACK.md) - Stack completo
- [`../.agent/workflows/mvp-development-methodology.md`](../.agent/workflows/mvp-development-methodology.md) - Metodología detallada
- [`../.agent/workflows/pre-launch-checklist.md`](../.agent/workflows/pre-launch-checklist.md) - Checklist completo

---

## 🎬 Para Nueva Conversación

Cuando abras una nueva conversación para desarrollar este MVP, usa:

```
Desarrollar MVP #2 - Plataforma de Agendamiento

Ubicación: /home/martin/ZerionStudio/DemoApps/mvp-02-booking-platform

Instrucciones:
1. Leer mvp-02-booking-platform/docs/CONTEXT.md
2. Leer mvp-02-booking-platform/docs/METHODOLOGY.md
3. Comenzar Fase 1 (Shaping)
```

---

**Creado**: 2026-01-13  
**Status**: Pendiente desarrollo  
**Prioridad**: #1 (Primer MVP a desarrollar)
