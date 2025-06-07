import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GastosService {
  private apiUrl = 'http://localhost:3000/api/gastos';

  constructor(private http: HttpClient) {}

  obtenerGastosAgrupados(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/mios`, { headers });
  }
}
