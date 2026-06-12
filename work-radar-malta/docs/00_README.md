# WorkRadar Malta — contexto global para Codex

WorkRadar Malta es una aplicación web para consultar y publicar reseñas laborales anónimas sobre empresas en Malta. La plataforma debe ser seria, neutral y útil: no es una blacklist ni una página de chismes.

## Stack acordado

- Next.js con App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase PostgreSQL
- Zod para validaciones
- React Hook Form para formularios

## Principios del producto

- Mobile-first.
- Código modular y mantenible.
- Las reseñas se publican solo después de moderación.
- Los usuarios son anónimos públicamente.
- No mostrar emails, user IDs ni datos personales.
- No permitir nombres de personas en reseñas.
- Lenguaje neutral: usar “low-rated”, “mixed reviews”, “payment concerns”, no “blacklist” ni insultos.
- Preparar la app para buenas prácticas de privacidad y GDPR.

## Entidades principales

- profiles
- companies
- reviews
- review_reports

## Roles

- user
- moderator
- admin

## Estados

- pending
- approved
- rejected
- flagged

## Orden recomendado

1. 01_setup_project.md
2. 02_database_schema.md
3. 03_authentication.md
4. 04_companies_module.md
5. 05_reviews_module.md
6. 06_admin_moderation.md
7. 07_review_reports.md
8. 08_ui_ux.md
9. 09_security_basics.md
10. 10_seo_and_deploy.md

## Cómo usar estos documentos con Codex

Abre un documento por fase y pásalo completo a Codex. Pídele que implemente solo esa fase y que no avance a la siguiente hasta que todos los criterios de aceptación estén cumplidos.
