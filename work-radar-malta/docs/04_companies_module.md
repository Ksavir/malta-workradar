# Fase 4 — Módulo de empresas

## Objetivo

Permitir listar, buscar, crear y ver empresas. Las empresas nuevas quedan pendientes hasta aprobación.

## Páginas

```txt
/companies
/companies/new
/companies/[slug]
```

## Tareas

1. Crear página de listado de empresas aprobadas.
2. Crear buscador por nombre.
3. Crear filtros por sector y localidad.
4. Crear página detalle de empresa.
5. Mostrar rating promedio calculado desde reviews aprobadas.
6. Mostrar número total de reviews aprobadas.
7. Crear formulario para añadir empresa.
8. Validar formulario con Zod.
9. Generar slug único automáticamente.
10. Guardar empresa con status `pending`.
11. Mostrar mensaje al usuario indicando que la empresa será revisada.

## Campos del formulario

```txt
name
sector
location
website
description
```

## Sectores sugeridos

```txt
Hospitality
Restaurants & Bars
Cleaning
Construction
Retail
Delivery
iGaming
Office & Admin
Healthcare
Education
Other
```

## Validaciones

- name requerido.
- sector requerido.
- location requerido.
- website opcional, pero si existe debe ser URL válida.
- description máximo 1000 caracteres.

## Página detalle de empresa

Debe mostrar:

- Nombre.
- Sector.
- Localidad.
- Website si existe.
- Descripción.
- Rating general.
- Ratings por categoría.
- Reviews aprobadas.
- CTA para dejar una review.

## Seguridad

- Solo mostrar companies con status `approved` públicamente.
- Usuario autenticado puede crear company `pending`.
- Usuario no puede auto-aprobar company.

## Criterios de aceptación

- `/companies` lista solo empresas aprobadas.
- Búsqueda y filtros funcionan.
- `/companies/[slug]` muestra detalle correcto.
- Usuario autenticado puede crear empresa pendiente.
- Empresa pendiente no aparece públicamente.

## Prompt directo para Codex

```txt
Implementa el módulo de empresas de WorkRadar Malta. Crea /companies, /companies/new y /companies/[slug]. Lista solo empresas aprobadas, añade búsqueda por nombre y filtros por sector/localidad. Permite a usuarios autenticados crear empresas con status pending. Genera slug único. En el perfil de empresa muestra datos, rating promedio y reseñas aprobadas.
```
