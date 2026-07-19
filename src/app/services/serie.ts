import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Serie {

  private apiUrl = "http://localhost:8080/series";

  constructor (private http: HttpClient) {}

  getSeries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSeriesPresqueFiniesPal(seuil: number): Observable<any []> {
    return this.http.get<any[]>(`${this.apiUrl}/presqueFiniesPal?seuil=${seuil}`);  
  }

  getSeriesAvecLivresAAcheter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seriesAvecLivresAAcheter`);
  }

  creerSerie(serieData:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, serieData);
  }

  supprimerSerie(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  modifierNombreLivreTotal(id: number, nouveauTotal: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/nombreLivreTotal`, {nombreLivreTotal: nouveauTotal});
  }

  modifierStatutPublication(id: number, nouveauStatut: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/statutPublication`, {statutPublication: nouveauStatut});
  }

  modifierStatutSerie(id: number, nouveauStatutSerie: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/statutSerie`, {statutSerie: nouveauStatutSerie});
  }
}
