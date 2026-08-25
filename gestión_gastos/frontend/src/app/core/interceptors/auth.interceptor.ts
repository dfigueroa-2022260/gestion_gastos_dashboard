import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.obtenerToken();

  const clonado = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonado).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo tratamos como "sesion expirada" los 401 de requests que SI
      // llevaban token (rutas protegidas). Un 401 en /login (credenciales
      // invalidas) no pasa por aca porque esa request no lleva Authorization.
      if (error.status === 401 && clonado.headers.has('Authorization')) {
        authService.expirarSesion();
      }
      return throwError(() => error);
    })
  );
};
