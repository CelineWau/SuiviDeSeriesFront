import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Livre {

  private apiUrl = "http://localhost:8080/livres";

  constructor (private http: HttpClient) {}

  creerLivre(livreData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, livreData);
  }

  modifierStatutLivre(id: number, statut: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/statut`, {statut: statut});
  }

  recupererAuteurs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/auteurs`);
  }
}
