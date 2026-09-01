import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepartitionFormat } from '../models/repartition-format';
import { AuteursSerieEnCours } from '../models/auteurs-series-en-cours';
import { LivreDetailData } from '../models/livre-detail';
import { ModifierLivreData } from '../models/modifier-livre';

@Injectable({
  providedIn: 'root',
})
export class Livre {

  private apiUrl = "http://localhost:8080/livres";

  constructor (private http: HttpClient) {}

  creerLivre(livreData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, livreData);
  }

  supprimerLivre(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  modifierStatutLivre(id: number, statut: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/statut`, {statut: statut});
  }

  modifierFormatLivre(id: number, nouveauFormat: string): Observable<LivreDetailData> {
    return this.http.patch<LivreDetailData>(`${this.apiUrl}/${id}/formatLivre`, {formatLivre: nouveauFormat});
  }

  modifierLivre(id: number, modifierLivreData: ModifierLivreData): Observable<LivreDetailData> {
    return this.http.patch<LivreDetailData>(`${this.apiUrl}/${id}`, modifierLivreData)
  }

  recupererAuteurs(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/auteurs`);
  }

  calculerRepartitionFormat(): Observable<RepartitionFormat> {
    return this.http.get<RepartitionFormat>(`${this.apiUrl}/repartitionFormat`)
  }

  getAuteursSeriesEnCours(): Observable<AuteursSerieEnCours []> {
    return this.http.get<AuteursSerieEnCours []>(`${this.apiUrl}/auteursSeriesEnCours`);
  }

  getLivre(id: number): Observable<LivreDetailData> {
    return this.http.get<LivreDetailData>(`${this.apiUrl}/${id}`);
  }
}
