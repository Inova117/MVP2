# API Specification - MVP #2: Plataforma de Agendamiento

**Version**: 1.0  
**Base URL**: `https://your-app.vercel.app/api`  
**Authentication**: Supabase Session Cookie

---

## Table of Contents

1. [Authentication](#authentication)
2. [Profiles](#profiles)
3. [Appointments](#appointments)
4. [Availability](#availability)
5. [Error Codes](#error-codes)

---

## Authentication

### Session Management

All API requests require authentication via Supabase session cookie.

**Middleware** automatically:
- Validates session
- Returns 401 if unauthenticated
- Attaches `session.user.id` to requests

---

## Profiles

### GET /api/profile

Get current user's profile.

**Auth**: Required

**Response 200**:
```json
{
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "avatar_url": "https://...",
    "role": "professional",
    "specialty": "Psicólogo",
    "bio": "Licensed psychologist with 10 years experience",
    "hourly_rate": 80.00,
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

**Errors**:
- `401`: Unauthorized

---

### PATCH /api/profile

Update current user's profile.

**Auth**: Required

**Request Body**:
```json
{
  "full_name": "John Smith",
  "specialty": "Psicólogo",
  "bio": "Updated bio",
  "avatar_url": "https://...",
  "hourly_rate": 90.00
}
```

**Validation**:
- `full_name`: 2-100 characters
- `specialty`: One of: Médico, Psicólogo, Abogado, Consultor, Otro
- `bio`: Max 500 characters
- `hourly_rate`: Decimal, max 2 decimals

**Response 200**:
```json
{
  "data": {
    "id": "uuid",
    "full_name": "John Smith",
    ...
  }
}
```

**Errors**:
- `400`: Validation failed
- `401`: Unauthorized
- `500`: Internal server error

---

### GET /api/professionals

List all professionals (public).

**Auth**: Optional

**Query Parameters**:
- `specialty` (optional): Filter by specialty
- `search` (optional): Search by name
- `limit` (optional, default 20): Max results

**Example**: `/api/professionals?specialty=Psicólogo&limit=10`

**Response 200**:
```json
{
  "data": [
    {
      "id": "uuid",
      "full_name": "Dr. Ana García",
      "specialty": "Psicólogo",
      "bio": "...",
      "avatar_url": "https://...",
      "hourly_rate": 80.00
    }
  ],
  "count": 5
}
```

---

## Appointments

### GET /api/appointments

List user's appointments (filtered by RLS).

**Auth**: Required

**Query Parameters**:
- `status` (optional): Filter by status (pending, confirmed, cancelled, completed)
- `from` (optional): ISO 8601 datetime (filter start_time >= from)
- `to` (optional): ISO 8601 datetime (filter start_time <= to)

**Example**: `/api/appointments?status=confirmed&from=2024-02-01T00:00:00Z`

**Response 200**:
```json
{
  "data": [
    {
      "id": "uuid",
      "client_id": "uuid",
      "professional_id": "uuid",
      "title": "Consultation",
      "description": "Regular checkup",
      "start_time": "2024-02-15T10:00:00Z",
      "end_time": "2024-02-15T11:00:00Z",
      "status": "confirmed",
      "created_at": "2024-02-01T08:30:00Z",
      "professional": {
        "full_name": "Dr. Ana García",
        "email": "ana@example.com"
      }
    }
  ],
  "count": 3
}
```

**Errors**:
- `401`: Unauthorized

---

### POST /api/appointments

Create new appointment (client only).

**Auth**: Required (role: client)

**Request Body**:
```json
{
  "professionalId": "uuid",
  "title": "Consultation",
  "description": "Regular checkup (optional)",
  "startTime": "2024-02-15T10:00:00Z",
  "endTime": "2024-02-15T11:00:00Z"
}
```

**Validation**:
- `professionalId`: Valid UUID
- `title`: 3-100 characters
- `description`: Max 500 characters (optional)
- `startTime`: Valid ISO 8601 datetime
- `endTime`: Must be after startTime

**Business Rules**:
1. No double-booking (checks professional's schedule)
2. Only clients can create appointments
3. Auto-sets `client_id` from session
4. Initial `status` = 'pending'

**Response 201**:
```json
{
  "data": {
    "id": "uuid",
    "client_id": "uuid",
    "professional_id": "uuid",
    "title": "Consultation",
    "status": "pending",
    "start_time": "2024-02-15T10:00:00Z",
    "end_time": "2024-02-15T11:00:00Z",
    "created_at": "2024-02-14T15:20:00Z"
  }
}
```

**Errors**:
- `400`: Validation failed
- `401`: Unauthorized
- `403`: User is not a client
- `409`: Slot conflict (time already booked)
- `500`: Internal server error

---

### GET /api/appointments/[id]

Get single appointment details.

**Auth**: Required (must be client or professional of appointment)

**Response 200**:
```json
{
  "data": {
    "id": "uuid",
    "client": {
      "id": "uuid",
      "full_name": "Carlos Méndez",
      "email": "carlos@example.com"
    },
    "professional": {
      "id": "uuid",
      "full_name": "Dr. Ana García",
      "email": "ana@example.com"
    },
    "title": "Consultation",
    "description": "Regular checkup",
    "start_time": "2024-02-15T10:00:00Z",
    "end_time": "2024-02-15T11:00:00Z",
    "status": "confirmed",
    "created_at": "2024-02-14T15:20:00Z"
  }
}
```

**Errors**:
- `401`: Unauthorized
- `403`: Forbidden (not your appointment)
- `404`: Appointment not found

---

### PATCH /api/appointments/[id]

Update appointment.

**Auth**: Required (must be client or professional)

**Request Body** (all fields optional):
```json
{
  "status": "confirmed",
  "cancellation_reason": "Conflict in schedule"
}
```

**Business Rules**:
- **Clients** can only:
  - Change status to 'cancelled'
  - Add `cancellation_reason`
  - Only if appointment is 'pending' or 'confirmed'
- **Professionals** can:
  - Change status to 'confirmed', 'completed', or 'cancelled'

**Validation**:
- `status`: One of: pending, confirmed, cancelled, completed
- `cancellation_reason`: Max 200 characters

**Response 200**:
```json
{
  "data": {
    "id": "uuid",
    "status": "confirmed",
    "updated_at": "2024-02-14T16:00:00Z"
  }
}
```

**Errors**:
- `400`: Validation failed
- `401`: Unauthorized
- `403`: Forbidden (business rule violation)
- `404`: Appointment not found
- `500`: Internal server error

---

### DELETE /api/appointments/[id]

Delete appointment (client only, pending status only).

**Auth**: Required (role: client, must be appointment owner)

**Business Rules**:
- Only clients can delete
- Only 'pending' appointments
- Use PATCH to cancel 'confirmed' appointments

**Response 200**:
```json
{
  "success": true
}
```

**Errors**:
- `401`: Unauthorized
- `403`: Forbidden (not client or wrong status)
- `404`: Appointment not found

---

## Availability

### GET /api/availability/[professionalId]

Get professional's availability settings.

**Auth**: Optional (public data)

**Query Parameters**:
- `date` (optional): Specific date (YYYY-MM-DD)

**Example**: `/api/availability/uuid-123?date=2024-02-15`

**Response 200**:
```json
{
  "data": {
    "professional_id": "uuid-123",
    "settings": [
      {
        "day_of_week": 1,
        "start_time": "09:00:00",
        "end_time": "17:00:00",
        "appointment_duration": 60
      },
      {
        "day_of_week": 2,
        "start_time": "09:00:00",
        "end_time": "17:00:00",
        "appointment_duration": 60
      }
    ],
    "booked_slots": [
      {
        "start_time": "2024-02-15T10:00:00Z",
        "end_time": "2024-02-15T11:00:00Z"
      }
    ],
    "available_slots": [
      "2024-02-15T09:00:00Z",
      "2024-02-15T11:00:00Z",
      "2024-02-15T12:00:00Z",
      ...
    ]
  }
}
```

**Errors**:
- `404`: Professional not found

---

### POST /api/availability

Create/update availability settings (professional only).

**Auth**: Required (role: professional)

**Request Body**:
```json
{
  "settings": [
    {
      "day_of_week": 1,
      "start_time": "09:00",
      "end_time": "17:00",
      "appointment_duration": 60
    }
  ]
}
```

**Validation**:
- `day_of_week`: 0-6 (0 = Sunday)
- `start_time`: HH:MM format
- `end_time`: HH:MM format, must be after start_time
- `appointment_duration`: 30, 60, 90, or 120 minutes

**Response 200**:
```json
{
  "data": {
    "settings": [...]
  }
}
```

**Errors**:
- `400`: Validation failed
- `401`: Unauthorized
- `403`: User is not a professional

---

## Error Codes

### Standard Error Response

```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "email",
    "message": "Invalid email format"
  }
}
```

### HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| `200` | OK | Successful GET, PATCH |
| `201` | Created | Successful POST |
| `400` | Bad Request | Validation failed |
| `401` | Unauthorized | Missing/invalid auth |
| `403` | Forbidden | Authenticated but not allowed |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Business rule violation (e.g., double-booking) |
| `500` | Internal Server Error | Unexpected server error |

### Common Error Codes

| Code | Message | Resolution |
|------|---------|------------|
| `UNAUTHORIZED` | Not authenticated | Login required |
| `FORBIDDEN` | Not allowed | Check user role/permissions |
| `VALIDATION_ERROR` | Invalid input | Check request body |
| `CONFLICT` | Resource conflict | Slot already booked, retry |
| `NOT_FOUND` | Resource not found | Check ID |

---

## Rate Limiting

**Current**: None (MVP)  
**Post-MVP**: 100 requests/minute per IP

---

## Versioning

**Current**: v1 (implicit in base URL)  
**Future**: `/api/v2/...` for breaking changes

---

## Testing

### Example curl Commands

**Create Appointment**:
```bash
curl -X POST https://your-app.vercel.app/api/appointments \
  -H "Content-Type: application/json" \
  -H "Cookie: sb-access-token=..." \
  -d '{
    "professionalId": "uuid-123",
    "title": "Consultation",
    "startTime": "2024-02-15T10:00:00Z",
    "endTime": "2024-02-15T11:00:00Z"
  }'
```

**List Appointments**:
```bash
curl https://your-app.vercel.app/api/appointments?status=confirmed \
  -H "Cookie: sb-access-token=..."
```

---

**Last Updated**: 2026-01-13  
**Maintained by**: Tech Lead  
**Reference**: See `START_HERE/ENGINEERING.md` for implementation details
