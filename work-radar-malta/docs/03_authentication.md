# Fase 3 — Autenticación

## Objetivo

Implementar autenticación con Supabase Auth, rutas protegidas y perfil privado de usuario.

## Contexto para Codex

Los usuarios deben iniciar sesión para crear empresas, dejar reseñas o reportar contenido. Su identidad nunca debe mostrarse públicamente.

## Páginas

```txt
/login
/register
/forgot-password
/dashboard
```

## Tareas

1. Instalar y configurar cliente de Supabase.
2. Crear helpers para cliente browser y server si aplica.
3. Implementar registro con email y password.
4. Implementar login.
5. Implementar logout.
6. Implementar recuperación de contraseña.
7. Proteger `/dashboard`.
8. Crear componente de estado de usuario en Header.
9. Crear página dashboard simple.
10. Asegurar que se crea `profile` automáticamente o manejar fallback si no existe.

## Validaciones

- Email válido.
- Password mínimo 8 caracteres.
- Mostrar errores claros.
- No mostrar errores técnicos crudos al usuario.

## Seguridad

- No mostrar email en páginas públicas.
- No exponer `user_id` en UI pública.
- Usar sesiones de Supabase correctamente.
- Proteger rutas privadas también en servidor, no solo con UI.

## Criterios de aceptación

- Un usuario puede registrarse.
- Un usuario puede iniciar sesión.
- Un usuario puede cerrar sesión.
- `/dashboard` no es accesible sin login.
- El Header cambia según estado de sesión.
- Existe profile para cada usuario registrado.

## Prompt directo para Codex

```txt
Implementa autenticación con Supabase Auth en WorkRadar Malta. Crea páginas /login, /register, /forgot-password y /dashboard. Protege /dashboard para usuarios autenticados. Añade logout y muestra estado de sesión en el Header. Valida formularios con Zod y React Hook Form. No expongas datos del usuario públicamente.
```
