# Fase 1 — Setup del proyecto

## Objetivo

Crear la base técnica de WorkRadar Malta usando Next.js, TypeScript, Tailwind CSS y App Router. Esta fase debe dejar una landing page inicial funcional y una arquitectura clara para continuar el desarrollo.

## Contexto para Codex

Vas a construir una aplicación llamada WorkRadar Malta. Es una plataforma donde usuarios pueden consultar y publicar reseñas laborales anónimas sobre empresas en Malta. La plataforma debe verse confiable, profesional y mobile-first.

## Stack

- Next.js con App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier

## Tareas

1. Crear o configurar un proyecto Next.js con App Router.
2. Configurar TypeScript.
3. Configurar Tailwind CSS.
4. Configurar ESLint y Prettier.
5. Crear archivo `.env.example` con variables placeholder:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

6. Crear esta estructura de carpetas:

```txt
/app
  /(public)
  /(auth)
  /(dashboard)
  /admin
/components
/lib
/types
/schemas
/actions
/hooks
/styles
```

7. Crear componentes base:

```txt
/components/layout/Header.tsx
/components/layout/Footer.tsx
/components/ui/Button.tsx
/components/ui/Input.tsx
/components/ui/Card.tsx
/components/ui/Badge.tsx
```

8. Crear una landing page inicial con:

- Header.
- Hero.
- Buscador visual de empresas, todavía sin lógica real.
- Sección “How it works”.
- CTA para dejar una reseña.
- Footer.

## Requisitos de diseño

- Mobile-first.
- Estilo SaaS limpio.
- Usar mucho espacio en blanco.
- Usar lenguaje neutral y profesional.
- Evitar estética agresiva de “denuncia” o “blacklist”.

## Texto sugerido para la landing

```txt
Make better career decisions in Malta.
Read anonymous workplace reviews, compare employers, and share your experience safely.
```

## Criterios de aceptación

- El proyecto corre con `npm run dev` sin errores.
- Tailwind funciona correctamente.
- La landing es responsive.
- La estructura de carpetas existe.
- Hay componentes reutilizables básicos.
- No hay lógica de base de datos todavía.

## Prompt directo para Codex

```txt
Implementa la Fase 1 de WorkRadar Malta. Configura Next.js con App Router, TypeScript, Tailwind, ESLint y Prettier. Crea la estructura de carpetas indicada, componentes base reutilizables y una landing page responsive con Header, Hero, buscador visual, sección How it works, CTA y Footer. No implementes base de datos ni autenticación todavía.
```
