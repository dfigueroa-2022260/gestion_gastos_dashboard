import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * Pagina "Home" del dashboard (contenido que antes vivia dentro del shell).
 * Los valores de las tarjetas y los graficos siguen siendo de ejemplo por
 * ahora; se pueden conectar a GET /api/gastos y GET /api/gastos/resumen
 * igual que se hizo con el modulo de Ingresos.
 */
@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss',
})
export class DashboardOverviewComponent {
  readonly lineaGastos = [12, 18, 22, 30, 26, 33, 29];
  readonly lineaIngresos = [8, 14, 19, 24, 34, 31, 38];
  readonly mesesLinea = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];

  readonly donutSegmentos = [
    { nombre: 'Salario', porcentaje: 30.3, color: 'var(--d-accent)' },
    { nombre: 'Extras', porcentaje: 28.6, color: 'var(--d-dark)' },
    { nombre: 'Ahorros', porcentaje: 28, color: 'var(--d-ink-soft)' },
    { nombre: 'Otros', porcentaje: 13.1, color: 'var(--d-border)' },
  ];

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
