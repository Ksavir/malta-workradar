# Fase 5 — Módulo de reseñas

## Objetivo

Permitir que usuarios autenticados dejen reseñas laborales estructuradas sobre empresas. Las reseñas quedan pendientes hasta aprobación.

## Páginas

```txt
/submit-review
/companies/[slug]/review
/dashboard/my-reviews
```

## Tareas

1. Crear formulario global para dejar reseña.
2. Crear formulario desde página de empresa.
3. Permitir seleccionar empresa existente.
4. Validar todos los ratings entre 1 y 5.
5. Guardar review con status `pending`.
6. Mostrar reviews aprobadas en página de empresa.
7. Crear `/dashboard/my-reviews` para que usuario vea sus propias reseñas.
8. Añadir estado visual de review: pending, approved, rejected, flagged.
9. Añadir checkboxes obligatorios de confirmación.
10. Añadir validación básica para evitar nombres de personas y datos personales.

## Campos de review

```txt
company_id
job_title
employment_type
worked_from
worked_to
is_current_employee
overall_rating
salary_rating
payment_punctuality_rating
work_environment_rating
schedule_respect_rating
management_rating
contract_transparency_rating
growth_opportunity_rating
pros
cons
advice
```

## Checkboxes obligatorios

```txt
Confirmo que esta reseña está basada en mi experiencia real.
Confirmo que no estoy incluyendo nombres de personas ni datos personales.
Acepto que mi reseña puede ser moderada antes de publicarse.
```

## Validaciones

- Usuario debe estar autenticado.
- `company_id` requerido.
- `job_title` requerido.
- `employment_type` requerido.
- `overall_rating` requerido.
- Ratings entre 1 y 5.
- `pros` o `cons` debe tener mínimo 30 caracteres.
- `advice` máximo 1000 caracteres.
- Bloquear emails y teléfonos en pros/cons/advice.
- Bloquear o advertir si detecta nombres propios con una validación básica.

## Reglas de publicación

- La review se guarda como `pending`.
- No se muestra públicamente hasta ser `approved`.
- El usuario puede ver sus propias reviews en dashboard.

## Criterios de aceptación

- Usuario autenticado puede enviar reseña.
- Usuario no autenticado es redirigido a login.
- Review queda pending.
- Página de empresa solo muestra reviews approved.
- Dashboard muestra reviews propias con estado.
- Validaciones funcionan correctamente.

## Prompt directo para Codex

```txt
Implementa el sistema de reseñas de WorkRadar Malta. Crea formularios en /submit-review y /companies/[slug]/review. Solo usuarios autenticados pueden enviar reviews. Valida con Zod y React Hook Form. Guarda cada review con status pending. Muestra solo reviews approved en el perfil de empresa. Crea /dashboard/my-reviews para que el usuario vea sus propias reseñas y estados.
```
