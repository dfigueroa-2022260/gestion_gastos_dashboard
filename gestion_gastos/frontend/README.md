# Cash Track — Frontend

Proyecto Angular standalone completo, con arquitectura por features. Ya incluye
el modulo `auth` (login conectado al backend) y un modulo `gastos` de arranque.

## Estructura

```
src/app/
  core/
    guards/auth.guard.ts           protege rutas privadas
    interceptors/auth.interceptor.ts  agrega el JWT a cada request
  features/
    auth/
      login/                       componente de login (ilustracion animada)
      models/auth.models.ts
      services/auth.service.ts
      auth.routes.ts
    gastos/
      gastos-home.component.ts     placeholder, protegido por el guard
      gastos.routes.ts
  app.routes.ts
  app.config.ts
src/environments/environment.ts    URL del backend (http://localhost:4000/api)
```

## Poner en marcha

```
pnpm install
pnpm start
```

Se levanta en `http://localhost:4200`. La ruta `/login` conecta contra
`POST http://localhost:4000/api/auth/login` del backend (asegurate de tenerlo
corriendo primero). Al iniciar sesion redirige a `/gastos`, protegida por el
guard, donde vas a ver el saludo con tu nombre y un boton de cerrar sesion.

## Siguiente paso

El modulo `gastos` es solo un placeholder. El siguiente paso natural es
construir ahi el listado, el alta de gastos y el resumen por categoria,
consumiendo los endpoints que ya expone el backend:

- `GET /api/gastos`
- `POST /api/gastos`
- `PUT /api/gastos/:id`
- `DELETE /api/gastos/:id`
- `GET /api/gastos/resumen`
- `GET|POST|PUT|DELETE /api/categorias`
