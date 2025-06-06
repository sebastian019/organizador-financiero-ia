// src/app/services/ai.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Reutilizaremos el servicio de Auth para obtener el token

@Injectable({
  providedIn: 'root'
})
export class AiService {

  // La URL base de nuestro backend. Asegúrate de que el puerto (3000) coincida con el de tu servidor.
  private apiUrl = 'http://localhost:3000/api/ai'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Envía una pregunta al backend para obtener consejo financiero.
   * @param prompt La pregunta del usuario.
   * @returns Un Observable con la respuesta de la IA.
   */
  getAdvice(prompt: string): Observable<{ advice: string }> {
    // 1. Obtenemos el token que guardamos en el localStorage al iniciar sesión.
    const token = this.authService.getToken(); 

    // 2. Creamos los encabezados (headers) de la petición, incluyendo el token de autorización.
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // 3. Hacemos la petición POST a nuestro backend, enviando el prompt en el cuerpo
    //    y los encabezados de autorización.
    return this.http.post<{ advice: string }>(`${this.apiUrl}/consultar`, { prompt }, { headers });
  }
}