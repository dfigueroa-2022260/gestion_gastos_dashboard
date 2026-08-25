import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-usuarios.component').then((m) => m.AdminUsuariosComponent),
  },
];
