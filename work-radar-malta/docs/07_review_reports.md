# Fase 7 — Sistema de reportes

## Objetivo

Permitir que usuarios autenticados reporten reseñas públicas por información falsa, datos personales, lenguaje ofensivo, riesgo de difamación, spam u otros motivos.

## Tareas

1. Añadir botón “Report review” en cada ReviewCard pública.
2. Crear formulario/modal para reportar.
3. Permitir seleccionar razón.
4. Permitir detalles opcionales.
5. Guardar reporte con status `open`.
6. Mostrar reportes en `/admin/reports`.
7. Permitir admin cambiar status del reporte.
8. Permitir admin navegar desde reporte hacia la review reportada.

## Razones de reporte

```txt
false_information
personal_data
offensive_language
defamation_risk
spam
other
```

## Estados de reporte

```txt
open
reviewed
dismissed
action_taken
```

## Validaciones

- Usuario debe estar autenticado.
- `reason` requerido.
- `details` máximo 1000 caracteres.
- No permitir múltiples reportes idénticos del mismo usuario a la misma review, si es fácil implementarlo.

## UI admin

En `/admin/reports` mostrar:

- Review reportada.
- Empresa.
- Razón.
- Detalles.
- Fecha.
- Estado.
- Acciones: reviewed, dismissed, action_taken.

## Criterios de aceptación

- Usuario autenticado puede reportar una review pública.
- Usuario no autenticado es enviado a login.
- Reporte se guarda como open.
- Admin puede ver reportes.
- Admin puede cambiar estado del reporte.

## Prompt directo para Codex

```txt
Implementa el sistema de reportes de WorkRadar Malta. Añade botón Report review en cada reseña pública. Crea modal/formulario con reason y details. Solo usuarios autenticados pueden reportar. Guarda reportes como open. En /admin/reports, permite a admin/moderator ver reportes y cambiar estado a reviewed, dismissed o action_taken.
```
