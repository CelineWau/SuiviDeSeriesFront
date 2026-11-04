import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfilData } from '../models/profil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilUtilisateur {

  private apiUrl = "http://localhost:8080/profil";

  constructor(private http: HttpClient) {}

  getProfil(): Observable<ProfilData> {
    return this.http.get<ProfilData>(this.apiUrl);
  }

  modifierEmail(email:string): Observable<ProfilData> {
    return this.http.patch<ProfilData>(`${this.apiUrl}/email`, {email});
  }

  modifierMdp(ancienMdp:string, nouveauMdp:string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/mot-de-passe`, {ancienMdp, nouveauMdp});
  }
}
