import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface OlvidePasswordForm {
  email: FormControl<string>;
}

@Component({
  selector: 'app-olvide-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './olvide-password.component.html',
  styleUrl: './olvide-password.component.scss',
})
export class OlvidePasswordComponent {
  readonly cargando = signal(false);
  readonly enviado = signal(false);
  readonly errorServidor = signal<string | null>(null);
  readonly form: FormGroup<OlvidePasswordForm>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.controls.email;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.errorServidor.set(null);

    this.authService.olvidePassword(this.form.getRawValue()).subscribe({
      next: () => {
        this.cargando.set(false);
        this.enviado.set(true);
      },
      error: () => {
        this.cargando.set(false);
        // Mostramos el mismo mensaje de exito aunque falle, para no revelar
        // si el correo existe o no en el sistema.
        this.enviado.set(true);
      },
    });
  }
}
