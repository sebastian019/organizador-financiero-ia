import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InversionesService {

  private apiKey = '485eecfb16c24606bbbd197e711d9225'; // Aquí pones tu API key de TwelveData
  private baseUrl = 'https://api.twelvedata.com';

  constructor(private http: HttpClient) { }

  obtenerDatosAccion(symbol: string): Observable<any> {
    // Endpoint para obtener datos de tiempo real o históricos (ejemplo: tiempo real)
    const url = `${this.baseUrl}/time_series?symbol=${symbol}&interval=1day&apikey=${this.apiKey}`;
    return this.http.get(url);
  }

}
