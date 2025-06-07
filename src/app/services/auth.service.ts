import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

// Define una interfaz para la estructura del token decodificado
interface DecodedToken {
  userId: number;
  username: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private decodedToken: DecodedToken | null = null;
  
  // El BehaviorSubject para emitir el estado de autenticación (logueado/no logueado)
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  
  // El Observable público para que otros componentes se suscriban a los cambios
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // --- MÉTODO AÑADIDO ---
  // Un helper privado para verificar si existe un token al iniciar el servicio.
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private loadToken() {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.decodedToken = jwtDecode(res.token);
        // --- CAMBIO CLAVE AQUÍ ---
        // Notificamos a todos los suscriptores que el usuario ha iniciado sesión.
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.decodedToken = null;
    // --- CAMBIO CLAVE AQUÍ ---
    // Notificamos a todos los suscriptores que el usuario ha cerrado sesión.
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

  deleteProfile(): Observable<any> {
    const token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };

    // La URL debe coincidir con la que definiremos en el backend
  return this.http.delete(`${this.apiUrl}/profile`, httpOptions).pipe(
      tap(() => {
        // Si el borrado es exitoso, cerramos la sesión del frontend
        this.logout();
      })
    );
  }



  




  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  // El método isLoggedIn() ya no es necesario para la reactividad, 
  // pero lo podemos mantener si alguna parte del código lo necesita para una
  // comprobación puntual. La cabecera usará isLoggedIn$.

  private getDecodedToken(): DecodedToken | null {
    if (!this.decodedToken) {
      this.loadToken();
    }
    return this.decodedToken;
  }

  getUsername(): string | null {
    return this.getDecodedToken()?.username || null;
  }

  getEmail(): string | null {
    return this.getDecodedToken()?.email || null;
  }

  getUserInitials(): string | null {
    const username = this.getUsername();
    if (!username) return null;
    return username.charAt(0).toUpperCase();
  }
}