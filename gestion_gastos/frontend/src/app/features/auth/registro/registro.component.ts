import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface RegistroForm {
  nombre: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmarPassword: FormControl<string>;
}

const passwordsCoincidenValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmar = control.get('confirmarPassword')?.value;

  if (!password || !confirmar) {
    return null;
  }

  return password === confirmar ? null : { passwordsNoCoinciden: true };
};

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  readonly cargando = signal(false);
  readonly errorServidor = signal<string | null>(null);
  readonly form: FormGroup<RegistroForm>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.nonNullable.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', [Validators.required]],
      },
      { validators: passwordsCoincidenValidator }
    );
  }

  get nombre() {
    return this.form.controls.nombre;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmarPassword() {
    return this.form.controls.confirmarPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.errorServidor.set(null);

    const { nombre, email, password } = this.form.getRawValue();

    this.authService.registro({ nombre, email, password }).subscribe({
      next: () => {
        this.cargando.set(false);
        this.router.navigate(['/gastos']);
      },
      error: (err) => {
        this.cargando.set(false);
        this.errorServidor.set(
          err?.error?.error ?? 'No se pudo crear la cuenta. Intenta de nuevo.'
        );
      },
    });
  }
}
