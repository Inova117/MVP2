# 🔧 ENGINEERING GUIDE - MVP #2: Plataforma de Agendamiento

**Responsabilidad**: Tech Lead / Senior Engineer  
**Enfoque**: CÓMO construir, arquitectura, implementación

---

## 📑 Tabla de Contenidos

### SETUP & ARCHITECTURE
1. [Prerequisites](#1-prerequisites)
2. [Project Initialization](#2-project-initialization)
3. [Configuration Files](#3-configuration-files-completos)
4. [Database Architecture](#4-database-architecture)
5. [Security (RLS Policies)](#5-security-rls-policies)

### IMPLEMENTATION
6. [Feature Implementation](#6-feature-implementation)
   - [6.1 Authentication](#61-authentication-implementation)
   - [6.2 Professional Profile](#62-professional-profile)
   - [6.3 Calendar View](#63-calendar-view)
   - [6.4 Book Appointment](#64-book-appointment)
   - [6.5 Manage Appointments](#65-manage-appointments)

### QUALITY & DEPLOY
7. [Testing Strategy](#7-testing-strategy)
8. [Deployment](#8-deployment--monitoring)
9. [Troubleshooting](#9-troubleshooting)

---

## 🔗 Cross-Reference to Product Spec

**Este documento implementa features definidas en** `PRODUCT.md`

| Feature (PRODUCT.md) | Implementation (Este doc) |
|---------------------|--------------------------|
| Feature #1: Authentication | § 6.1 |
| Feature #2: Professional Profile | § 6.2 |
| Feature #3: Calendar View | § 6.3 |
| Feature #4: Book Appointment | § 6.4 |
| Feature #5: Manage Appointments | § 6.5 |

**Acceptance Criteria**: Cada sección referencia AC de PRODUCT.md

---

## 1. Prerequisites

### Required
- Node.js 20.11.0 (usar `.nvmrc`)
- npm 10+
- Git
- Cuenta Supabase (gratis)
- Cuenta Vercel (gratis)
- Cuenta Sentry (gratis)

### Verificación
```bash
node --version  # 20.11.0
npm --version   # 10+
git --version   # 2.40+
```

---

## 2. Project Initialization

### 2.1 Create Next.js Project

```bash
# En mvp-02-booking-platform/
npx create-next-app@latest ./ \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

# Responder prompts:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ App Router: Yes
# ✓ Customize import alias: Yes (@/*)
```

**Verificación**:
```bash
npm run dev
# Debe abrir localhost:3000
```

---

## 3. Configuration Files (Completos)

### 3.1 TypeScript Configuration

**`tsconfig.json`** (REEMPLAZAR):
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }],
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3.2 ESLint + Prettier

**`.eslintrc.json`**:
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:security/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "security", "unused-imports"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "unused-imports/no-unused-imports": "error"
  }
}
```

**`.prettierrc`**:
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 3.3 Environment Variables

**`.env.example`**:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SENTRY_DSN=
```

**`.env.local`** (crear, NO commitear):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

### 3.4 Testing Configuration

**`vitest.config.ts`**:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 85,
      functions: 85,
      branches: 80,
      statements: 85,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

**`playwright.config.ts`**:
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### 3.5 Install Dependencies

```bash
# Core
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zod react-hook-form @hookform/resolvers
npm install date-fns lucide-react clsx tailwind-merge next-themes

# Dev dependencies
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-security eslint-plugin-unused-imports eslint-config-prettier prettier
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @playwright/test @tailwindcss/forms
npm install -D husky lint-staged @next/bundle-analyzer

# Sentry
npx @sentry/wizard@latest -i nextjs
```

**Verificar instalación**:
```bash
npm list --depth=0 | grep -E "supabase|vitest|playwright"
```

---

## 4. Database Architecture

### 4.1 Schema Design

**Crear `supabase/migrations/00001_initial_schema.sql`**:

```sql
-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('client', 'professional')) NOT NULL,
  specialty TEXT,
  bio TEXT,
  hourly_rate DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Professional availability settings
CREATE TABLE availability_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6) NOT NULL, -- 0=Sunday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  appointment_duration INTEGER DEFAULT 60 CHECK (appointment_duration IN (30, 60, 90, 120)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(professional_id, day_of_week)
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  professional_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Prevent double-booking
  CONSTRAINT no_overlap EXCLUDE USING gist (
    professional_id WITH =,
    tstzrange(start_time, end_time) WITH &&
  ) WHERE (status NOT IN ('cancelled'))
);

-- Indexes for performance
CREATE INDEX idx_appointments_client ON appointments(client_id);
CREATE INDEX idx_appointments_professional ON appointments(professional_id);
CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at 
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Aplicar migration**:
```bash
npx supabase init
npx supabase link --project-ref your-project-ref
npx supabase db push
```

**Generar TypeScript types**:
```bash
npx supabase gen types typescript --local > types/database.ts
```

---

## 5. Security (RLS Policies)

**CRÍTICO**: Row Level Security es la capa principal de seguridad.

**Crear `supabase/migrations/00002_rls_policies.sql`**:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Availability settings policies
CREATE POLICY "Anyone can view availability"
  ON availability_settings FOR SELECT
  USING (true);

CREATE POLICY "Professionals can manage their availability"
  ON availability_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.id = availability_settings.professional_id
      AND profiles.role = 'professional'
    )
  );

-- Appointments policies
CREATE POLICY "Users can view their own appointments"
  ON appointments FOR SELECT
  USING (
    auth.uid() = client_id OR 
    auth.uid() = professional_id
  );

CREATE POLICY "Clients can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (
    auth.uid() = client_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'client'
    )
  );

CREATE POLICY "Users can update their appointments"
  ON appointments FOR UPDATE
  USING (
    auth.uid() = client_id OR 
    auth.uid() = professional_id
  )
  WITH CHECK (
    -- Clients can only change: cancellation_reason, status to 'cancelled'
    -- Professionals can change: status
    CASE
      WHEN auth.uid() = client_id THEN 
        (NEW.status = 'cancelled' OR OLD.status = NEW.status)
      WHEN auth.uid() = professional_id THEN
        NEW.status IN ('confirmed', 'completed')
      ELSE false
    END
  );

CREATE POLICY "Only clients can delete their appointments"
  ON appointments FOR DELETE
  USING (
    auth.uid() = client_id AND
    status = 'pending'
  );
```

**Aplicar**:
```bash
npx supabase db push
```

**Verificar RLS activo**:
```bash
npx supabase db remote exec "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"
# row_security debe ser 't' (true)
```

---

## 6. Feature Implementation

### 6.1 Authentication Implementation

**Satisface**: `PRODUCT.md` → Feature #1  
**Acceptance Criteria**: `PRODUCT.md` → AC-1.1, AC-1.2, AC-1.3

#### 6.1.1 Supabase Client Setup

**`lib/supabase.ts`**:
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database'

export const supabase = createClientComponentClient<Database>()
```

#### 6.1.2 Validation Schemas

**`lib/validations.ts`**:
```typescript
import { z } from 'zod'

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
```

#### 6.1.3 Login Page

**`app/(auth)/login/page.tsx`**:
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInInput } from '@/lib/validations'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInInput) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sign In
        </h1>

        {error && (
          <div
            className="mb-4 p-3 bg-error-light text-error-dark rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

#### 6.1.4 Middleware (Protected Routes)

**`middleware.ts`** (raíz):
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect dashboard routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect authenticated users away from auth pages
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
```

**Verificación AC**:
- ✅ AC-1.2: Login form con email/password
- ✅ AC-1.2: Redirect a /dashboard post-login
- ✅ AC-1.2: Error mostrado si credentials inválidos
- ✅ AC-1.3: /dashboard requiere auth (middleware)

---

### 6.2 Professional Profile

**Satisface**: `PRODUCT.md` → Feature #2  
**AC**: `PRODUCT.md` → AC-2.1, AC-2.2

#### API Route

**`app/api/profile/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'

const updateProfileSchema = z.object({
  full_name: z.string().min(2).max(100),
  specialty: z.enum(['Médico', 'Psicólogo', 'Abogado', 'Consultor', 'Otro']).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
})

export async function PATCH(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = updateProfileSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(validation.data)
      .eq('id', session.user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

### 6.3 Calendar View

**Satisface**: `PRODUCT.md` → Feature #3  
**AC**: `PRODUCT.md` → AC-3.1, AC-3.2, AC-3.3

(Código extenso - ver `../docs/DESIGN_SYSTEM.md` para componentes UI)

---

### 6.4 Book Appointment

**Satisface**: `PRODUCT.md` → Feature #4  
**AC**: `PRODUCT.md` → AC-4.1, AC-4.2, AC-4.3, AC-4.4

**`app/api/appointments/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'

const createAppointmentSchema = z.object({
  professionalId: z.string().uuid(),
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
}).refine(
  (data) => new Date(data.endTime) > new Date(data.startTime),
  { message: 'End time must be after start time' }
)

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = createAppointmentSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { professionalId, title, description, startTime, endTime } = validation.data

    // Check for conflicts (double-booking prevention)
    const { data: conflicts } = await supabase
      .from('appointments')
      .select('id')
      .eq('professional_id', professionalId)
      .neq('status', 'cancelled')
      .or(`start_time.gte.${startTime},end_time.lte.${endTime}`)

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: 'Slot no longer available' },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        client_id: session.user.id,
        professional_id: professionalId,
        title,
        description,
        start_time: startTime,
        end_time: endTime,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
    }

    // TODO: Send confirmation email
    // await sendConfirmationEmail(data)

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Verificación AC**:
- ✅ AC-4.3: Booking flow con modal
- ✅ AC-4.4: Conflict detection (race condition handled)
- ✅ AC-4.4: No múltiples citas al mismo tiempo

---

## 7. Testing Strategy

### 7.1 Unit Tests

**`tests/validations.test.ts`**:
```typescript
import { describe, it, expect } from 'vitest'
import { createAppointmentSchema } from '@/lib/validations'

describe('createAppointmentSchema', () => {
  it('accepts valid appointment data', () => {
    const validData = {
      professionalId: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Consultation',
      startTime: '2024-02-01T10:00:00Z',
      endTime: '2024-02-01T11:00:00Z',
    }

    const result = createAppointmentSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects end time before start time', () => {
    const invalidData = {
      professionalId: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test',
      startTime: '2024-02-01T11:00:00Z',
      endTime: '2024-02-01T10:00:00Z',
    }

    const result = createAppointmentSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
```

**Run tests**:
```bash
npm run test        # watch mode
npm run test:ci     # with coverage
```

### 7.2 E2E Tests

**`tests/e2e/booking-flow.spec.ts`**:
```typescript
import { test, expect } from '@playwright/test'

test.describe('Booking Flow', () => {
  test('complete appointment booking', async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('input[name="email"]', 'client@test.com')
    await page.fill('input[name="password"]', 'Test123!')
    await page.click('button[type="submit"]')

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard')

    // Navigate to booking
    await page.click('text=Book Appointment')

    // Select professional
    await page.click('[data-testid="professional-card-1"]')

    // Select time slot
    await page.click('[data-testid="slot-2024-02-01-10:00"]')

    // Fill booking form
    await page.fill('input[name="title"]', 'Consultation')
    await page.fill('textarea[name="description"]', 'Regular checkup')

    // Submit
    await page.click('button:has-text("Confirm Booking")')

    // Verify success
    await expect(page).toHaveURL('/dashboard/appointments')
    await expect(page.locator('text=Consultation')).toBeVisible()
  })
})
```

**Run E2E**:
```bash
npm run test:e2e       # headless
npm run test:e2e:ui    # UI mode
```

---

## 8. Deployment & Monitoring

### 8.1 Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Configure environment variables in Vercel Dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_SENTRY_DSN
```

### 8.2 Pre-Deploy Checklist

```bash
# All checks must pass
npm run type-check  # ✓
npm run lint        # ✓
npm run test:ci     # ✓ coverage > 85%
npm run test:e2e    # ✓
npm run build       # ✓
npm audit           # ✓ no high/critical
```

### 8.3 Monitoring

**Sentry** (already configured):
- Error tracking automático
- Performance monitoring
- Release tracking

**Vercel Analytics**:
- Web Vitals
- Edge function logs

---

## 9. Troubleshooting

### Build fails
```bash
rm -rf node_modules .next
npm install
npm run build
```

### RLS blocks queries
```bash
# Verify policies
npx supabase db remote exec "SELECT * FROM pg_policies WHERE tablename = 'appointments';"

# Check current user
SELECT auth.uid();
```

### Type errors after DB change
```bash
# Regenerate types
npx supabase gen types typescript --local > types/database.ts
```

---

**Última actualización**: 2026-01-13  
**Versión**: 1.0  
**Owner**: Tech Lead
