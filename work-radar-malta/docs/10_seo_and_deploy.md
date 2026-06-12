# Fase 10 — SEO básico y preparación para deploy

## Objetivo

Preparar WorkRadar Malta para ser indexable, compartible y desplegable en producción.

## Tareas SEO

1. Añadir metadata global.
2. Añadir metadata dinámica en páginas de empresa.
3. Añadir Open Graph básico.
4. Crear `sitemap.xml`.
5. Crear `robots.txt`.
6. Usar URLs limpias con slugs.
7. Añadir canonical URLs.
8. Optimizar títulos y descripciones.

## Metadata sugerida

Homepage:

```txt
Title: WorkRadar Malta | Anonymous Workplace Reviews in Malta
Description: Read and share anonymous workplace reviews about employers in Malta. Compare companies by payment, work environment, schedules and contract transparency.
```

Company page:

```txt
Title: Reviews of [Company Name] in Malta | WorkRadar Malta
Description: Read anonymous workplace reviews for [Company Name] in Malta, including ratings for payment, work environment, schedules and contract transparency.
```

## Deploy

Preparar para:

- Vercel para Next.js.
- Supabase para Auth y PostgreSQL.

## Variables de entorno

Verificar `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

## Checklist antes de producción

- RLS activado.
- Policies revisadas.
- No exponer service role key al cliente.
- Variables configuradas en Vercel.
- Build sin errores.
- Sitemap accesible.
- robots.txt accesible.
- Páginas legales creadas.
- Formularios protegidos.

## Criterios de aceptación

- `npm run build` pasa sin errores.
- Metadata existe en homepage y páginas de empresa.
- Sitemap funciona.
- robots.txt funciona.
- Variables de entorno documentadas.
- Proyecto listo para deploy en Vercel.

## Prompt directo para Codex

```txt
Implementa SEO básico y preparación para deploy en WorkRadar Malta. Añade metadata global, metadata dinámica en páginas de empresa, Open Graph, sitemap.xml, robots.txt, canonical URLs y revisa que npm run build funcione. Actualiza .env.example y crea checklist de deploy para Vercel + Supabase.
```
