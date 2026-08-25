import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

/**
 * Base visual del dashboard (sidebar + topbar + tarjetas + graficos).
 * Los valores de las tarjetas y los graficos son de ejemplo por ahora;
 * el siguiente paso es conectarlos a GET /api/gastos y GET /api/gastos/resumen.
 */
@Component({
  selector: 'app-gastos-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gastos-home.component.html',
  styleUrl: './gastos-home.component.scss',
})
export class GastosHomeComponent {
  readonly itemsSidebar = [
    { icono: 'home', label: 'Home' },
    { icono: 'chart', label: 'Resumen' },
    { icono: 'card', label: 'Gastos' },
    { icono: 'money', label: 'Ingresos' },
    { icono: 'grid', label: 'Categorias' },
    { icono: 'tag', label: 'Etiquetas' },
    { icono: 'pie', label: 'Reportes' },
    { icono: 'clipboard', label: 'Metas' },
  ];

  readonly activo = 'Gastos';

  // Datos de ejemplo para el grafico de lineas (Resumen de gastos).
  readonly lineaGastos = [12, 18, 22, 30, 26, 33, 29];
  readonly lineaIngresos = [8, 14, 19, 24, 34, 31, 38];
  readonly mesesLinea = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];

  // Datos de ejemplo para el donut (Resumen de ingresos por categoria).
  readonly donutSegmentos = [
    { nombre: 'Salario', porcentaje: 30.3, color: 'var(--d-accent)' },
    { nombre: 'Extras', porcentaje: 28.6, color: 'var(--d-dark)' },
    { nombre: 'Ahorros', porcentaje: 28, color: 'var(--d-ink-soft)' },
    { nombre: 'Otros', porcentaje: 13.1, color: 'var(--d-border)' },
  ];

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /** Convierte un array de valores (0-40) en puntos "x,y" para un polyline. */
  puntosLinea(valores: number[]): string {
    const anchoUtil = 420;
    const altoUtil = 160;
    const max = 40;
    const paso = anchoUtil / (valores.length - 1);

    return valores
      .map((v, i) => {
        const x = 30 + i * paso;
        const y = 190 - (v / max) * altoUtil;
        return `${x},${y}`;
      })
      .join(' ');
  }

  /** Calcula el offset acumulado de cada segmento del donut (circunferencia = 251). */
  donutOffset(index: number): number {
    const circunferencia = 251;
    const acumulado = this.donutSegmentos
      .slice(0, index)
      .reduce((sum, s) => sum + s.porcentaje, 0);
    return circunferencia - (acumulado / 100) * circunferencia;
  }

  donutLargo(porcentaje: number): number {
    const circunferencia = 251;
    return (porcentaje / 100) * circunferencia;
  }
}
