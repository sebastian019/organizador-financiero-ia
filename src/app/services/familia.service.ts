import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  private apiUrl = 'http://localhost:3000/api/familia';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getMiembros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/miembros`, { headers: this.getAuthHeaders() });
  }

  agregarMiembro(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, { email }, { headers: this.getAuthHeaders() });
  }

  borrarMiembro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrar/${id}`, { headers: this.getAuthHeaders() });
  }
}