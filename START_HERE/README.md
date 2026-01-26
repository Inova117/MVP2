# 🚀 START HERE - MVP #2: Plataforma de Agendamiento

**Punto de entrada único para desarrollo del MVP.**

---

## 📂 Estructura de Documentación

Este MVP separa **responsabilidades** en dos perspectivas:

### 👔 **PRODUCT.md** - Product Manager Perspective
**Responsabilidad**: **QUÉ** construir, **POR QUÉ**, **CUÁNDO**

- Business context & objetivos
- User research & problemas 
- Features (MoSCoW priorization)
- User stories
- Acceptance criteria
- Success metrics & KPIs
- Timeline & sprints

**Lee esto si eres**: Product Manager, AI Product Manager

📄 **[Ir a PRODUCT.md →](./PRODUCT.md)**

---

### 🔧 **ENGINEERING.md** - Tech Lead Perspective
**Responsabilidad**: **CÓMO** construir, arquitectura, implementación

- Setup técnico completo
- Database architecture & RLS
- API design patterns
- Security implementation
- Testing strategy (unit + E2E)
- Código de implementación
- CI/CD & deployment

**Lee esto si eres**: Engineer, Tech Lead, AI Developer

📄 **[Ir a ENGINEERING.md →](./ENGINEERING.md)**

---

## 🤖 Workflow para AI

### Escenario 1: AI Product Manager

```
1. Leer PRODUCT.md completamente
2. Definir/refinar features según business goals
3. Escribir user stories & acceptance criteria
4. Priorizar features (MoSCoW)
5. Actualizar PRODUCT.md con decisions
6. Referenciar a ENGINEERING.md para implementación
```

**Output**: Features definidas y priorizadas con acceptance criteria clara

---

### Escenario 2: AI Engineer

```
1. Leer ENGINEERING.md completamente
2. Consultar PRODUCT.md solo para:
   - Features a implementar
   - Acceptance criteria
   - Success metrics
3. Implementar features según arquitectura definida
4. Escribir tests que verifican acceptance criteria
5. Verificar contra quality gates
6. Deploy según deployment guide
```

**Output**: Código production-ready que cumple acceptance criteria

---

### Escenario 3: AI Full-Stack (ambos roles)

```
1. Leer README.md (este archivo)
2. Ejecutar workflow Product Manager:
   - Leer PRODUCT.md
   - Definir features
3. Ejecutar workflow Engineer:
   - Leer ENGINEERING.md
   - Implementar features
4. Validar que implementación cumple acceptance criteria
```

**Output**: MVP completo desde concepto hasta producción

---

## 📊 Comunicación Entre Documentos

### De PRODUCT.md → ENGINEERING.md

```markdown
## Feature #1: User Can Book Appointment

**User Story**: 
Como cliente, quiero reservar una cita con un profesional...

**Acceptance Criteria**:
- [ ] User can select professional from list
- [ ] User can pick date/time
- [ ] Confirmation email sent
- [ ] Appointment appears in dashboard

**Implementation Guide**: 
Ver ENGINEERING.md → § 6.3 "Book Appointment Implementation"
```

### De ENGINEERING.md → PRODUCT.md

```typescript
## § 6.3 Book Appointment Implementation

**Satisfies**: PRODUCT.md → Feature #1

**Acceptance Criteria Reference**: 
- ✅ Professional selection: `components/features/appointments/professional-select.tsx`
- ✅ Date/time picker: Uses `date-fns`, validates against professional availability
- ✅ Email notification: Supabase Edge Function `send-confirmation-email`
- ✅ Dashboard integration: Real-time subscription to `appointments` table

[código técnico...]
```

---

## ⏱️ Timeline General

**Total**: 2 semanas (14 días)

| Fase | Días | Responsable | Documento |
|------|------|-------------|-----------|
| **Product Shaping** | 1 | PM | PRODUCT.md |
| **Architecture** | 1 | Tech Lead | ENGINEERING.md § 1-5 |
| **Implementation** | 8 | Engineer | ENGINEERING.md § 6 |
| **QA** | 2 | Both | PRODUCT.md (acceptance) + ENGINEERING.md (technical QA) |
| **Deploy** | 1 | Engineer | ENGINEERING.md § 8 |
| **Launch Review** | 1 | Both | Ambos documentos |

---

## 📋 Orden de Lectura

### Si eres Product Manager:
1. ✅ Este archivo (README.md)
2. ✅ `../docs/CONTEXT.md` (contexto del MVP)
3. ✅ **PRODUCT.md** (tu documento principal)
4. 📖 ENGINEERING.md (opcional, para entender technical constraints)

### Si eres Engineer:
1. ✅ Este archivo (README.md)
2. ✅ `../docs/CONTEXT.md` (contexto del MVP)
3. ✅ **ENGINEERING.md** (tu documento principal)
4. 📖 PRODUCT.md (consulta para acceptance criteria)

### Si eres Full-Stack (ambos):
1. ✅ Este archivo (README.md)
2. ✅ `../docs/CONTEXT.md`
3. ✅ PRODUCT.md (define QUÉ)
4. ✅ ENGINEERING.md (implementa CÓMO)
5. ✅ Valida implementación vs acceptance criteria

---

## 🎯 Quick Start

### Para AI Product Manager:
```bash
# Leer contexto
cat ../docs/CONTEXT.md

# Trabajar en product spec
cat PRODUCT.md

# Output: Features definidas + acceptance criteria
```

### Para AI Engineer:
```bash
# Leer contexto
cat ../docs/CONTEXT.md

# Leer guía técnica
cat ENGINEERING.md

# Consultar features a implementar
grep "Feature #" PRODUCT.md

# Implementar según ENGINEERING.md
```

---

## 📁 Otros Documentos de Referencia

Ambos roles pueden consultar:

| Documento | Para Qué |
|-----------|----------|
| `../docs/METHODOLOGY.md` | Proceso general (Fase 0-5) |
| `../docs/DESIGN_SYSTEM.md` | UI/UX patterns |
| `../docs/TECH_STACK.md` | Stack tecnológico |
| `../docs/QUALITY_STANDARDS.md` | Standards de código |
| `../docs/CI_CD_GUIDE.md` | Deployment pipeline |
| `../docs/CHECKLIST.md` | QA checklist |

---

## ✅ Beneficios de Esta Estructura

### Separación Clara de Responsabilidades
- ✅ PM se enfoca en **valor de negocio**
- ✅ Engineer se enfoca en **calidad técnica**
- ✅ Sin overlap ni confusión

### Referencias Bidireccionales
- ✅ Product → Engineering (implementation guide)
- ✅ Engineering → Product (acceptance verification)

### AI-Friendly
- ✅ Cada AI sabe qué documento leer
- ✅ Workflow claro para cada rol
- ✅ Comunicación estructurada entre roles

### Mantenibilidad
- ✅ Actualizar product spec no requiere tocar technical docs
- ✅ Refactors técnicos no afectan product decisions
- ✅ Single source of truth para cada área

---

## 🆘 Si Algo No Está Claro

### ¿Qué documento leo?
- **PM/Business**: PRODUCT.md
- **Engineer/Technical**: ENGINEERING.md
- **Ambos/Full-Stack**: PRODUCT.md primero, luego ENGINEERING.md

### ¿Dónde defino features?
- **PRODUCT.md** (con acceptance criteria)

### ¿Dónde está el código de implementación?
- **ENGINEERING.md** (con referencias a features de PRODUCT.md)

### ¿Cómo sé que cumplí los requisitos?
- Cada implementación en ENGINEERING.md referencia acceptance criteria de PRODUCT.md
- Tests verifican acceptance criteria

---

**Última actualización**: 2026-01-13  
**Versión**: 3.0 (Separation of Concerns)  
**MVP**: #2 - Plataforma de Agendamiento
