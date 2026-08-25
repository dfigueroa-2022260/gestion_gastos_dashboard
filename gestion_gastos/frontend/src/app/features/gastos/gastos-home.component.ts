import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-gastos-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding: 40px; font-family: Inter, sans-serif;">
      <h2>
        Hola, {{ authService.usuario()?.nombre }} 👋
        <span style="font-size: 12px; color: #5c6b85;">({{ authService.usuario()?.rol }})</span>
      </h2>
      <p>Aca va el modulo de gastos (listado, alta y resumen por categoria).</p>
      <a *ngIf="authService.esAdmin()" routerLink="/admin" style="color: #e8672a;">
        Ir al panel de administracion &rarr;
      </a>
      <br /><br />
      <button (click)="salir()">Cerrar sesion</button>
    </div>
  `,
})
export class GastosHomeComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
