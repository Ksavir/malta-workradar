# Fase 8 — UI/UX y componentes reutilizables

## Objetivo

Pulir la interfaz para que WorkRadar Malta se vea como un producto profesional, confiable y cómodo en móvil.

## Dirección visual

La web debe sentirse:

- Seria.
- Moderna.
- Confiable.
- Útil.
- Neutral.

No debe sentirse como una página de exposición, chismes o ataque a empresas.

## Inspiración

- Glassdoor para perfiles de empresa.
- Trustpilot para reseñas.
- Product Hunt para cards y listados.
- Linear para limpieza visual.

## Componentes requeridos

```txt
CompanyCard
RatingStars
RatingBreakdown
ReviewCard
SearchBar
FilterPanel
EmptyState
LoadingState
AdminTable
StatusBadge
Alert
Button
Input
Textarea
Select
Modal
Pagination
```

## Tareas

1. Revisar todas las páginas públicas.
2. Hacer responsive todos los formularios.
3. Crear RatingStars reutilizable.
4. Crear CompanyCard reutilizable.
5. Crear ReviewCard reutilizable.
6. Crear StatusBadge para estados.
7. Crear EmptyState para listas vacías.
8. Crear LoadingState.
9. Crear diseño consistente para admin tables.
10. Mejorar accesibilidad básica.

## Reglas de estilo

- Mobile-first.
- Cards con bordes suaves.
- Mucho espacio en blanco.
- Tipografía legible.
- Colores sobrios.
- CTA claros.
- Evitar rojo excesivo.
- Usar microcopy profesional.

## Microcopy sugerido

```txt
Share your workplace experience safely.
Your identity is never shown publicly.
Reviews are moderated before publication.
Help others make informed career decisions.
```

## Accesibilidad

- Labels en inputs.
- Estados focus visibles.
- Contraste adecuado.
- Botones con texto claro.
- No depender solo del color para estados.

## Criterios de aceptación

- La app se ve profesional.
- Todas las páginas principales funcionan bien en móvil.
- Los componentes son reutilizables.
- Hay estados loading/error/empty.
- Los formularios son cómodos de usar.
- La UI no usa lenguaje agresivo.

## Prompt directo para Codex

```txt
Mejora la UI/UX de WorkRadar Malta. Crea componentes reutilizables CompanyCard, RatingStars, RatingBreakdown, ReviewCard, SearchBar, FilterPanel, EmptyState, LoadingState, AdminTable, StatusBadge, Alert, Button, Input, Textarea, Select, Modal y Pagination. Aplica diseño mobile-first, profesional y neutral en todas las páginas públicas, dashboard y admin.
```
