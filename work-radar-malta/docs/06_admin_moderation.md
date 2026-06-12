# Fase 6 — Panel de moderación admin

## Objetivo

Crear un panel de administración para aprobar o rechazar empresas y reseñas, gestionar notas de moderación y proteger acciones sensibles.

## Rutas

```txt
/admin
/admin/companies
/admin/reviews
/admin/reports
```

## Tareas

1. Crear layout de admin.
2. Proteger rutas admin según `profiles.role`.
3. Crear dashboard admin con métricas básicas:
   - companies pending.
   - reviews pending.
   - reports open.
4. Crear tabla de companies pending.
5. Crear acciones para aprobar/rechazar companies.
6. Crear tabla de reviews pending.
7. Crear vista detalle de review para moderar.
8. Permitir aprobar/rechazar/flaggear review.
9. Permitir añadir `moderation_notes`.
10. Asegurar que acciones admin están protegidas en backend.

## Reglas de acceso

- Solo `admin` y `moderator` pueden entrar a `/admin`.
- Usuario normal debe recibir redirect o error 403.
- Las server actions/API routes deben comprobar rol antes de modificar datos.

## Moderación de empresas

Acciones:

```txt
approve
reject
```

## Moderación de reseñas

Acciones:

```txt
approve
reject
flag
```

## UI sugerida

- Sidebar simple.
- Tablas con StatusBadge.
- Botones claros de approve/reject.
- Modal o página detalle para revisar contenido largo.
- Alertas de confirmación antes de rechazar.

## Criterios de aceptación

- Admin puede aprobar empresas.
- Admin puede rechazar empresas.
- Admin puede aprobar reseñas.
- Admin puede rechazar reseñas.
- Usuario normal no puede acceder a admin.
- Usuario normal no puede llamar acciones admin desde cliente.
- Las notas de moderación se guardan.

## Prompt directo para Codex

```txt
Implementa el panel admin de WorkRadar Malta. Crea rutas /admin, /admin/companies, /admin/reviews y /admin/reports. Protege todas las rutas y acciones usando profiles.role. Admin y moderator pueden aprobar/rechazar empresas y reseñas, añadir moderation_notes y ver métricas básicas. Asegura que la protección esté en backend, no solo en la UI.
```
