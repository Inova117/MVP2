# Database Schema - MVP #2: Plataforma de Agendamiento

**Database**: PostgreSQL (Supabase)  
**Version**: 1.0  
**Last Updated**: 2026-01-13

---

## 📊 Entity Relationship Diagram

```mermaid
erDiagram
    auth_users ||--|| profiles : "extends"
    profiles ||--o{ appointments : "client"
    profiles ||--o{ appointments : "professional"
    profiles ||--o{ availability_settings : "owns"
    
    auth_users {
        uuid id PK "Supabase auth.users"
        text email
        timestamp created_at
    }
    
    profiles {
        uuid id PK FK "References auth.users"
        text email "NOT NULL"
        text full_name "NOT NULL"
        text avatar_url "Nullable"
        text role "client/professional"
        text specialty "Nullable"
        text bio "Max 500 chars"
        decimal hourly_rate "Nullable"
        timestamp created_at
        timestamp updated_at
    }
    
    availability_settings {
        uuid id PK
        uuid professional_id FK "References profiles"
        int day_of_week "0-6, 0=Sunday"
        time start_time "09:00:00"
        time end_time "17:00:00"
        int appointment_duration "30/60/90/120 min"
        timestamp created_at
    }
    
    appointments {
        uuid id PK
        uuid client_id FK "References profiles"
        uuid professional_id FK "References profiles"
        text title "NOT NULL"
        text description "Nullable, max 500"
        timestamptz start_time "NOT NULL"
        timestamptz end_time "NOT NULL"
        text status "pending/confirmed/cancelled/completed"
        text cancellation_reason "Nullable"
        timestamp created_at
        timestamp updated_at
    }
```

---

## 📋 Tables

### 1. `profiles`

Extends Supabase `auth.users` with application-specific data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, REFERENCES auth.users(id) | User ID (same as auth.users) |
| `email` | TEXT | NOT NULL | User email (duplicated for query performance) |
| `full_name` | TEXT | NOT NULL | Display name |
| `avatar_url` | TEXT | | Profile photo URL (Supabase Storage) |
| `role` | TEXT | NOT NULL, CHECK (IN 'client', 'professional') | User role |
| `specialty` | TEXT | | Professional's specialty (Médico, Psicólogo, etc.) |
| `bio` | TEXT | MAX 500 chars | Professional bio |
| `hourly_rate` | DECIMAL(10,2) | | Professional's rate (optional) |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Account creation |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update (auto-updated via trigger) |

**Indexes**:
- `idx_profiles_role` on `role` (filter professionals)

**RLS Policies**:
- SELECT: Public (all profiles viewable)
- INSERT: User can insert their own profile
- UPDATE: User can update only their own profile

**Trigger**:
- `update_profiles_updated_at`: Auto-updates `updated_at` on modification

---

### 2. `availability_settings`

Professional's weekly availability schedule.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Setting ID |
| `professional_id` | UUID | NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE | Owner |
| `day_of_week` | INTEGER | NOT NULL, CHECK (0-6) | 0 = Sunday, 6 = Saturday |
| `start_time` | TIME | NOT NULL | Start of availability (e.g., 09:00) |
| `end_time` | TIME | NOT NULL | End of availability (e.g., 17:00) |
| `appointment_duration` | INTEGER | DEFAULT 60, CHECK (IN 30, 60, 90, 120) | Slot duration in minutes |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Constraints**:
- `UNIQUE(professional_id, day_of_week)`: One setting per day per professional

**RLS Policies**:
- SELECT: Public (anyone can view availability)
- INSERT/UPDATE/DELETE: Only owning professional

**Example Data**:
```sql
-- Dr. Ana works Monday-Friday, 9am-5pm, 60min slots
INSERT INTO availability_settings (professional_id, day_of_week, start_time, end_time, appointment_duration)
VALUES
  ('uuid-ana', 1, '09:00', '17:00', 60),  -- Monday
  ('uuid-ana', 2, '09:00', '17:00', 60),  -- Tuesday
  ('uuid-ana', 3, '09:00', '17:00', 60),  -- Wednesday
  ('uuid-ana', 4, '09:00', '17:00', 60),  -- Thursday
  ('uuid-ana', 5, '09:00', '17:00', 60);  -- Friday
```

---

### 3. `appointments`

Booked appointments between clients and professionals.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Appointment ID |
| `client_id` | UUID | NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE | Client who booked |
| `professional_id` | UUID | NOT NULL, REFERENCES profiles(id) ON DELETE CASCADE | Professional providing service |
| `title` | TEXT | NOT NULL | Appointment title/type |
| `description` | TEXT | | Additional notes (max 500 chars) |
| `start_time` | TIMESTAMPTZ | NOT NULL | Appointment start (UTC) |
| `end_time` | TIMESTAMPTZ | NOT NULL | Appointment end (UTC) |
| `status` | TEXT | DEFAULT 'pending', CHECK (IN ...) | Status (see below) |
| `cancellation_reason` | TEXT | | Reason if cancelled |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Booking timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last modification (auto-updated) |

**Status Values**:
- `pending`: Created, awaiting professional confirmation
- `confirmed`: Professional accepted
- `cancelled`: Cancelled by either party
- `completed`: Appointment finished

**Constraints**:
- `no_overlap`: EXCLUDE constraint prevents double-booking
  ```sql
  CONSTRAINT no_overlap EXCLUDE USING gist (
    professional_id WITH =,
    tstzrange(start_time, end_time) WITH &&
  ) WHERE (status NOT IN ('cancelled'))
  ```

**Indexes**:
- `idx_appointments_client` on `client_id`
- `idx_appointments_professional` on `professional_id`
- `idx_appointments_start_time` on `start_time` (for date queries)
- `idx_appointments_status` on `status` (for filtered lists)

**RLS Policies**:
- SELECT: User can see appointments where they are client OR professional
- INSERT: Only clients can create, auto-sets `client_id` from session
- UPDATE: Both parties can update, with restrictions:
  - Clients: Can only cancel
  - Professionals: Can confirm, complete, or cancel
- DELETE: Only clients can delete 'pending' appointments

**Trigger**:
- `update_appointments_updated_at`: Auto-updates `updated_at`

---

## 🔒 Security (Row Level Security)

All tables have RLS enabled. See `supabase/migrations/00002_rls_policies.sql` for complete policies.

### Key Security Features

1. **Authentication Required**: All mutations require valid session
2. **Role-Based Access**: 
   - Clients can book, cancel
   - Professionals can confirm, complete
3. **Data Isolation**: Users can only see their own appointments (via RLS)
4. **Conflict Prevention**: EXCLUDE constraint prevents double-booking
5. **Audit Trail**: `created_at`, `updated_at` track all changes

---

## 📐 Business Rules Enforced

### At Database Level

1. **No Double-Booking**: `no_overlap` constraint
2. **Valid Roles**: CHECK constraint on `profiles.role`
3. **Valid Status**: CHECK constraint on `appointments.status`
4. **Time Logic**: End time must be after start time (enforced in app)

### At Application Level

1. **24h Cancellation**: Clients can only cancel if >24h before appointment
2. **Status Transitions**:
   - `pending` → `confirmed` (professional)
   - `pending` → `cancelled` (either party)
   - `confirmed` → `completed` (professional, after end_time)
   - `confirmed` → `cancelled` (either party)
3. **Email Notifications**: Sent on status changes (app layer)

---

## 🔄 Data Flow Examples

### Booking Flow

```
1. Client creates appointment
   → INSERT INTO appointments (client_id, professional_id, ..., status='pending')
   
2. Professional confirms
   → UPDATE appointments SET status='confirmed' WHERE id=X
   
3. After appointment time
   → UPDATE appointments SET status='completed' WHERE id=X
```

### Availability Check

```
1. Frontend requests professional's availability
   → SELECT * FROM availability_settings WHERE professional_id=X

2. Query existing appointments
   → SELECT start_time, end_time FROM appointments
     WHERE professional_id=X AND status!='cancelled'

3. Calculate free slots (app logic)
   → available_slots = all_slots - booked_slots
```

---

## 📊 Query Examples

### Most Common Queries

**Get user's upcoming appointments**:
```sql
SELECT 
  a.*,
  p.full_name as professional_name
FROM appointments a
JOIN profiles p ON a.professional_id = p.id
WHERE a.client_id = auth.uid()
  AND a.start_time > NOW()
  AND a.status != 'cancelled'
ORDER BY a.start_time ASC;
```

**Get professional's schedule for date**:
```sql
SELECT *
FROM appointments
WHERE professional_id = 'uuid-x'
  AND DATE(start_time) = '2024-02-15'
  AND status != 'cancelled'
ORDER BY start_time;
```

**Find available professionals**:
```sql
SELECT 
  p.*,
  COUNT(a.id) as total_appointments
FROM profiles p
LEFT JOIN appointments a ON p.id = a.professional_id
WHERE p.role = 'professional'
  AND p.specialty = 'Psicólogo'
GROUP BY p.id
ORDER BY total_appointments DESC;
```

---

## 🔧 Migrations

### Applied Order

1. `00001_initial_schema.sql`: Create tables, indexes, triggers
2. `00002_rls_policies.sql`: Enable RLS, create policies

### How to Apply

```bash
# Initialize Supabase
npx supabase init

# Link to project
npx supabase link --project-ref your-ref

# Apply migrations
npx supabase db push

# Generate TypeScript types
npx supabase gen types typescript --local > types/database.ts
```

---

## 📈 Performance Considerations

### Indexes Created

All frequently-queried columns have indexes:
- `appointments`: client_id, professional_id, start_time, status
- `profiles`: role

### Optimization Tips

1. **Date Range Queries**: Use indexed `start_time`
   ```sql
   WHERE start_time BETWEEN '2024-02-01' AND '2024-02-29'
   ```

2. **Status Filters**: Use indexed `status`
   ```sql
   WHERE status = 'confirmed'
   ```

3. **Avoid**: Full-text search on `description` (not indexed)

---

## 🧪 Test Data

See `supabase/seed.sql` for sample data:
- 2 professionals
- 3 clients
- 10 appointments
- Availability settings

---

**References**:
- Implementation: `START_HERE/ENGINEERING.md` § 4-5
- API: `docs/API_SPEC.md`
- RLS Policies: `supabase/migrations/00002_rls_policies.sql`
