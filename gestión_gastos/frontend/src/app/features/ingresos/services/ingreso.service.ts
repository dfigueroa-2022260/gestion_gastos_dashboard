import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Categoria, Ingreso, IngresoInput, ResumenCategoria } from '../models/ingreso.models';

@Injectable({ providedIn: 'root' })
export class IngresoService {
  private readonly baseUrl = `${environment.apiUrl}/ingresos`;
  private readonly categoriasUrl = `${environment.apiUrl}/categorias`;

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(this.baseUrl);
  }

  resumen(): Observable<ResumenCategoria[]> {
    return this.http.get<ResumenCategoria[]>(`${this.baseUrl}/resumen`);
  }

  crear(data: IngresoInput): Observable<Ingreso> {
    return this.http.post<Ingreso>(this.baseUrl, data);
  }

  actualizar(id: string, data: IngresoInput): Observable<Ingreso> {
    return this.http.put<Ingreso>(`${this.baseUrl}/${id}`, data);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl);
  }

  crearCategoria(nombre: string, color: string): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriasUrl, { nombre, color });
  }
}
