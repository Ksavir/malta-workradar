# Fase 9 — Seguridad básica, privacidad y anti-abuso

## Objetivo

Añadir medidas básicas para reducir spam, proteger datos personales, evitar XSS y preparar la plataforma para buenas prácticas de privacidad.

## Tareas

1. Validar todos los formularios con Zod.
2. Sanitizar inputs de usuario.
3. No renderizar HTML enviado por usuarios.
4. Añadir rate limiting en creación de reviews.
5. Añadir rate limiting en creación de reports.
6. Añadir rate limiting en creación de companies.
7. Bloquear emails y teléfonos en textos públicos.
8. Bloquear nombres de personas de forma básica o marcar para revisión.
9. No mostrar email, user_id ni datos personales en UI pública.
10. Crear página de eliminación de cuenta o solicitud de borrado.
11. Crear logs mínimos para errores sin guardar datos sensibles.
12. Revisar RLS y acciones server-side.

## Anti-XSS

Reglas:

- Nunca usar `dangerouslySetInnerHTML` para contenido de usuarios.
- Renderizar texto plano.
- Escapar contenido si fuera necesario.
- Validar longitud máxima de campos.

## Anti-spam

Límites sugeridos:

```txt
Máximo 3 reviews por usuario por día.
Máximo 5 reports por usuario por día.
Máximo 3 companies nuevas por usuario por día.
```

## Datos personales a bloquear

- Emails.
- Teléfonos.
- Nombres completos.
- Direcciones físicas exactas.
- Números de documentos.
- Links a perfiles personales.

## Páginas legales mínimas

```txt
/privacy
/terms
/guidelines
/delete-account
```

## Contenido mínimo de guidelines

- Publica solo experiencias reales.
- No incluyas nombres de personas.
- No publiques datos personales.
- No uses insultos o amenazas.
- No publiques información confidencial.
- Las reseñas pueden ser moderadas.

## Criterios de aceptación

- Todos los inputs críticos tienen Zod.
- No se renderiza HTML del usuario.
- Rate limiting básico funciona.
- Datos personales obvios son bloqueados o marcados.
- Páginas legales básicas existen.
- No se muestran emails ni user IDs públicamente.

## Prompt directo para Codex

```txt
Añade seguridad básica y privacidad a WorkRadar Malta. Valida formularios con Zod, sanitiza inputs, evita XSS, no renderices HTML de usuarios, añade rate limiting para reviews/reports/companies, bloquea emails y teléfonos en textos públicos, no muestres emails ni user IDs públicamente y crea páginas /privacy, /terms, /guidelines y /delete-account.
```
