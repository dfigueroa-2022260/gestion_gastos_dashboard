import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface ResetPasswordForm {
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
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  readonly cargando = signal(false);
  readonly exito = signal(false);
  readonly errorServidor = signal<string | null>(null);
  readonly tokenPresente = signal(true);

  readonly form: FormGroup<ResetPasswordForm>;

  private token = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.fb.nonNullable.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', [Validators.required]],
      },
      { validators: passwordsCoincidenValidator }
    );
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.tokenPresente.set(!!this.token);
  }

  get password() {
    return this.form.controls.password;
  }

  get confirmarPassword() {
    return this.form.controls.confirmarPassword;
  }

  onSubmit(): void {
    if (this.form.invalid || !this.token) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.errorServidor.set(null);

    this.authService
      .resetPassword({ token: this.token, password: this.password.value })
      .subscribe({
        next: () => {
          this.cargando.set(false);
          this.exito.set(true);
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.cargando.set(false);
          this.errorServidor.set(
            err?.error?.error ?? 'El enlace es invalido o ya expiro.'
          );
        },
      });
  }
}
