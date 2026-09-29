import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequestData } from '../models/register-request';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = "http://localhost:8080/auth";
  private readonly TOKEN_KEY = 'jwt_token';

  constructor (private http: HttpClient) {}

  inscrireUtilisateur(registerRequestData: RegisterRequestData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiUrl}/register`, registerRequestData);
  }

  connecterUtilisateur(pseudo: string, mdp: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${this.apiUrl}/login`, {pseudo, mdp});
  }

  stockerToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  estConnecte(): boolean {
    return this.getToken() !== null;
  }

  deconnecter(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
