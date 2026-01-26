# Contexto: Plataforma de Agendamiento para Servicios

## 🎯 Objetivo del MVP

Crear una plataforma de agendamiento moderna y funcional que permita a negocios de servicios (clínicas, salones, consultorías) gestionar citas de forma automatizada, eliminando el trabajo manual de coordinación.

---

## 💡 Problema que Resuelve

### Pain Points Identificados:

1. **Coordinación manual ineficiente**
   - Negocios pierden 2-3 horas diarias coordinando citas por WhatsApp/teléfono
   - Errores en doble-booking
   - Falta de visibilidad del calendario

2. **No-shows y cancelaciones**
   - 20-30% de citas resultan en no-shows
   - Sin recordatorios automáticos
   - Pérdida de ingresos

3. **Falta de profesionalismo**
   - Confirmaciones manuales inconsistentes
   - Sin sistema de historial
   - Mala experiencia de cliente

4. **Problemas de escalabilidad**
   - Difícil crecer sin contratar más recepcionistas
   - No hay métricas de ocupación
   - Sin integración de pagos

---

## ✨ Solución (Value Proposition)

**"Automatiza tu agenda y recupera 15 horas semanales"**

Una plataforma que permite:
- ✅ Clientes agendan online 24/7 (sin intervención humana)
- ✅ Confirmaciones automáticas por email + WhatsApp
- ✅ Recordatorios automáticos (reduce no-shows en 70%)
- ✅ Dashboard de gestión en tiempo real
- ✅ Historial de clientes y métricas
- ✅ Pagos integrados (opcional)

---

## 🎯 Target Audience

### Primario:
1. **Clínicas médicas/estéticas** (5-20 empleados)
   - Múltiples doctores/terapeutas
   - Alto volumen de citas
   - Necesitan recordatorios

2. **Salones de belleza** (3-15 empleados)
   - Servicios variados (corte, color, manicure)
   - Citas con duración variable
   - Alto % de clientes recurrentes

3. **Consultorías/Coaching** (1-5 empleados)
   - Sesiones 1-on-1
   - Pago por sesión
   - Clientes internacionales (timezones)

### Secundario:
- Studios de fitness/yoga
- Veterinarias
- Talleres mecánicos
- Cualquier negocio basado en citas

---

## 🚀 Features Core (Must-Have para MVP)

### 1. Autenticación Dual
- **Negocios** (Providers):
  - Registro con verificación
  - Configurar perfil de negocio
  - Gestionar servicios y precios
  
- **Clientes** (End Users):
  - Registro simple (email o Google/Facebook)
  - Ver historial de citas

### 2. Configuración de Disponibilidad
- Horarios de atención (lunes-domingo)
- Bloques de tiempo configurables (15, 30, 60 min)
- Días no laborables / vacaciones
- Múltiples empleados/recursos (opcional para v1)

### 3. Catálogo de Servicios
- Crear servicios (ej: "Corte de cabello", "Consulta médica")
- Definir duración y precio
- Descripción y foto opcional

### 4. Sistema de Reservas (Cliente)
- Ver calendario de disponibilidad
- Seleccionar servicio
- Elegir fecha/hora disponible
- Confirmar reserva
- Recibir confirmación inmediata

### 5. Dashboard de Negocio
- Vista de calendario (día/semana/mes)
- Lista de citas próximas
- Marcar cita como completada
- Cancelar/Reagendar citas
- Ver historial de cliente

### 6. Notificaciones Automáticas
- **Confirmación inmediata** (al agendar)
- **Recordatorio 24h antes**
- **Recordatorio 1h antes** (opcional)
- Canales: Email (must) + WhatsApp (nice-to-have)

### 7. Dashboard de Cliente
- Ver mis próximas citas
- Cancelar cita (con X horas de anticipación)
- Ver historial

---

## 🔧 Features Nice-to-Have (Roadmap, NO para MVP)

- [ ] Pagos integrados (adelantar 50% al reservar)
- [ ] Multi-empleado (asignar citas a diferentes personas)
- [ ] Integración Google Calendar
- [ ] Sistema de reviews/ratings
- [ ] Programa de lealtad
- [ ] Multi-idioma
- [ ] App móvil nativa
- [ ] Reportes avanzados (ingresos, ocupación)

---

## 📊 Success Metrics (Ficticias para Case Study)

### Valor de Negocio Proyectado:
- ⏱️ **Ahorro de tiempo**: 15 horas/semana (60% menos tiempo en coordinación)
- 💰 **Reducción de no-shows**: 70% (de 30% a 9%)
- 📈 **Incremento en reservas**: 40% (disponibilidad 24/7)
- 😊 **Satisfacción del cliente**: +35%
- 💵 **ROI**: 300% en 6 meses

### KPIs para Demo:
- Tiempo promedio de reserva: <2 minutos
- Tasa de confirmación: 95%
- Uptime: 99.9%

---

## 🎨 Diseño / UX Considerations

### Principios:
1. **Simplicidad** - Reservar debe ser trivial (3 clicks)
2. **Claridad** - Disponibilidad visual clara (calendario)
3. **Confianza** - Confirmaciones inmediatas, recordatorios
4. **Mobile-first** - 70% de users agendarán desde móvil

### Inspiración:
- Calendly (simplicidad)
- Acuity Scheduling (features)
- Fresha (belleza/salones)

### Colores (del Design System):
- Primary (azul): Acciones principales, CTAs
- Secondary (púrpura): Highlights, badges
- Success (verde): Confirmaciones
- Neutrals: Background, texto

---

## 🗄️ Database Entities (High-Level)

Ver `DATABASE_SCHEMA.md` (se creará en fase de arquitectura) para detalles.

**Entidades principales**:
1. **Users** (clientes y negocios)
2. **Businesses** (perfil de negocio)
3. **Services** (servicios ofrecidos)
4. **Availability** (horarios disponibles)
5. **Appointments** (las citas)
6. **Notifications** (log de notificaciones enviadas)

---

## 💰 Pricing Model (para vender este tipo de solución)

### Como SaaS (post-MVP):
- **Básico**: $29/mes - 1 usuario, 100 citas/mes
- **Profesional**: $79/mes - 5 usuarios, citas ilimitadas
- **Enterprise**: $199/mes - usuarios ilimitados, white-label

### Como desarrollo custom (nuestro caso):
- **MVP**: $2,500 USD (2 semanas)
- **Features adicionales**: $300-$500 c/u
- **Mantenimiento**: $300/mes

---

## 🌎 Market Considerations (LATAM)

### Por qué es ideal para LATAM:
1. WhatsApp integración (crítico en LATAM)
2. MercadoPago como método de pago
3. Español por defecto
4. Zona horaria LATAM
5. Muchos negocios aún usan Excel/papel

### Competencia:
- Calendly (gringo, caro, no WhatsApp)
- Acuity (similar problema)
- Soluciones locales (anticuadas)

**Ventaja**: Diseño moderno + features LATAM + precio accesible

---

## 📝 User Stories (Para Development)

### Como Cliente:
- Quiero ver horarios disponibles sin tener que llamar
- Quiero reservar en menos de 2 minutos
- Quiero recibir confirmación inmediata
- Quiero recibir recordatorio para no olvidar
- Quiero poder cancelar si surge algo

### Como Negocio:
- Quiero configurar mis horarios de atención fácilmente
- Quiero ver todas mis citas del día de un vistazo
- Quiero que se envíen recordatorios automáticamente
- Quiero ver historial de clientes frecuentes
- Quiero marcar citas como completadas

---

## ⚠️ Rabbit Holes Identificados (Riesgos)

1. **Timezone management** - Clientes en diferentes zonas
   - **Mitigación**: Usar UTC en DB, convertir en UI
   
2. **Conflictos de reserva** - Dos personas reservan mismo slot
   - **Mitigación**: Optimistic locking, transacciones DB
   
3. **WhatsApp integration** - API compleja/cara
   - **Mitigación**: Usar Twilio, o solo Email para MVP
   
4. **Cancelaciones** - Reglas de negocio complejas
   - **Mitigación**: Política simple: cancelar hasta 2h antes

5. **Multi-empleado** - Complejidad de asignación
   - **Mitigación**: NO para MVP, single employee

---

## 🎯 Definition of Done

Este MVP está completo cuando:
- ✅ Negocio puede configurar servicios y horarios
- ✅ Cliente puede ver disponibilidad y reservar
- ✅ Se envían confirmaciones automáticas (email)
- ✅ Dashboard muestra citas próximas
- ✅ Responsive perfecto (mobile/tablet/desktop)
- ✅ Pasa 100% pre-launch checklist
- ✅ Deploy en producción con datos de ejemplo
- ✅ Video demo de 2-3 min grabado

---

**Creado**: 2026-01-13  
**Última actualización**: 2026-01-13  
**Owner**: Zerion MVP Studio
