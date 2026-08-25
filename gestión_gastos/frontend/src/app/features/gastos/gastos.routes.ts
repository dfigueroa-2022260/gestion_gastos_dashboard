import { Routes } from '@angular/router';

export const GASTOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./gastos-home.component').then((m) => m.GastosHomeComponent),
  },
];
