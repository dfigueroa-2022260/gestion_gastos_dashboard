import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-session-expired-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-expired-modal.component.html',
  styleUrl: './session-expired-modal.component.scss',
})
export class SessionExpiredModalComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  volverAlLogin(): void {
    this.authService.cerrarAvisoExpiracion();
    this.router.navigate(['/login']);
  }
}
