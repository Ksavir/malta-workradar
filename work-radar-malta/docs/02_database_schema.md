# Fase 2 — Base de datos Supabase

## Objetivo

Diseñar e implementar el esquema de base de datos en Supabase para WorkRadar Malta, incluyendo tablas, enums, relaciones, triggers y Row Level Security.

## Contexto para Codex

La plataforma tendrá empresas, reseñas, usuarios y reportes. Las empresas y reseñas nuevas quedan pendientes hasta aprobación. El contenido aprobado es público. Los usuarios normales no pueden aprobar ni modificar estados.

## Tablas necesarias

- profiles
- companies
- reviews
- review_reports

## Enums requeridos

```sql
user_role: user, moderator, admin
company_status: pending, approved, rejected
review_status: pending, approved, rejected, flagged
employment_type: full_time, part_time, freelance, internship, temporary, informal, other
report_reason: false_information, personal_data, offensive_language, defamation_risk, spam, other
report_status: open, reviewed, dismissed, action_taken
```

## Campos sugeridos

### profiles

```txt
id uuid primary key references auth.users(id)
role user_role default 'user'
display_name text nullable
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz nullable
```

### companies

```txt
id uuid primary key
name text not null
slug text unique not null
sector text not null
location text not null
website text nullable
description text nullable
logo_url text nullable
status company_status default 'pending'
created_by uuid references profiles(id)
created_at timestamptz
updated_at timestamptz
```

### reviews

```txt
id uuid primary key
company_id uuid references companies(id)
user_id uuid references profiles(id)
job_title text not null
employment_type employment_type not null
worked_from date nullable
worked_to date nullable
is_current_employee boolean default false
overall_rating int check between 1 and 5
salary_rating int check between 1 and 5
payment_punctuality_rating int check between 1 and 5
work_environment_rating int check between 1 and 5
schedule_respect_rating int check between 1 and 5
management_rating int check between 1 and 5
contract_transparency_rating int check between 1 and 5
growth_opportunity_rating int check between 1 and 5
pros text nullable
cons text nullable
advice text nullable
status review_status default 'pending'
moderation_notes text nullable
created_at timestamptz
updated_at timestamptz
```

### review_reports

```txt
id uuid primary key
review_id uuid references reviews(id)
reported_by uuid references profiles(id)
reason report_reason not null
details text nullable
status report_status default 'open'
created_at timestamptz
updated_at timestamptz
```

## Row Level Security

Activar RLS en todas las tablas.

## Policies mínimas

### profiles

- Usuario autenticado puede leer su propio profile.
- Usuario autenticado puede actualizar campos permitidos de su propio profile.
- Admin puede leer todos los profiles.

### companies

- Cualquiera puede leer companies con status `approved`.
- Usuario autenticado puede crear company con status `pending`.
- Usuario puede leer companies creadas por él.
- Admin/moderator puede leer y actualizar todas.

### reviews

- Cualquiera puede leer reviews con status `approved`.
- Usuario autenticado puede crear review con status `pending`.
- Usuario puede leer sus propias reviews aunque estén pending/rejected.
- Admin/moderator puede leer y actualizar todas.

### review_reports

- Usuario autenticado puede crear report.
- Usuario puede leer sus propios reports.
- Admin/moderator puede leer y actualizar todos.

## Funciones y triggers

Crear función `handle_updated_at()` para actualizar `updated_at`.

Crear trigger para cada tabla con `updated_at`.

Opcional pero recomendado: crear función para generar profile automáticamente cuando se crea un usuario en `auth.users`.

## Criterios de aceptación

- El SQL se ejecuta en Supabase sin errores.
- Todas las tablas tienen UUID primary key.
- RLS está activado.
- Las policies impiden exposición de datos privados.
- Las companies y reviews públicas solo muestran contenido aprobado.
- Admin/moderator puede moderar.

## Prompt directo para Codex

```txt
Genera el SQL completo para Supabase de WorkRadar Malta. Incluye enums, tablas, relaciones, checks de ratings entre 1 y 5, timestamps, triggers para updated_at, Row Level Security y policies seguras para profiles, companies, reviews y review_reports. Las empresas y reseñas aprobadas son públicas. Las pendientes solo las ve su creador y admin/moderator. Solo admin/moderator puede cambiar estados.
```
