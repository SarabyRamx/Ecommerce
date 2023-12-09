import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class autenticación {
  private apiUrl = 'URL_DEL_SERVIDOR';  // Reemplazar con la URL de tu servidor de autenticación
  private tokenKey = 'myAppAuthToken';  // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) { }

  login(credentials: { data: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    // Verificar si el token está presente y no ha expirado
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    // Lógica para verificar si el token ha expirado
    // Retornar true si ha expirado, false de lo contrario
    // Puedes utilizar bibliotecas como jwt-decode para decodificar el token y obtener la información de expiración
    return false;  // Placeholder, debes implementar esta lógica
  }
}
