import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { RepartitionStatutSerieData } from '../models/repartition-statut-serie';
import { TailleSerieData } from '../models/taille-serie';
import { EbookALeatoireData } from '../models/ebook-aleatoire';
import { PalVieillissanteData } from '../models/pal-vieillissante';
import { SeriesASurveillerData } from '../models/serie-a-surveiller';
import { ListeCourseLivreData } from '../models/liste-course-livre';

@Injectable({
  providedIn: 'root',
})
export class Serie {

  private apiUrl = "http://localhost:8080/series";

  constructor (private http: HttpClient) {}

  getSeries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSeriesPresqueFiniesPal(seuil: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/presqueFiniesPal?seuil=${seuil}`);  
  }

  getSeriesAvecLivresAAcheter(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seriesAvecLivresAAcheter`);
  }

  getCompteurSerieParAnnee(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/compteurSerieParAnnee`);
  }

  getSerieAJour(): Observable<any []> {
    return this.http.get<any[]>(`${this.apiUrl}/trouverSerieAJour`);
  }

  getSeriesDelaissees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seriesDelaissees`);
  }

  getRatioSeries(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ratioSeries`);
  }

  getRepartitionStatutSerie(): Observable<RepartitionStatutSerieData> {
    return this.http.get<RepartitionStatutSerieData>(`${this.apiUrl}/repartitionStatutSerie`);
  }

  getSeriesLesPlusLongues(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/seriesLesPlusLongues`);
  }

  getRepartitionTailleSeries(): Observable<TailleSerieData> {
    return this.http.get<TailleSerieData>(`${this.apiUrl}/repartitionTailleSeries`);
  }

  getDureeMoyenneLectureSerie(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/dureeMoyenneLectureSerie`);
  }

  getEbookAleatoire(): Observable<EbookALeatoireData> {
    return this.http.get<EbookALeatoireData>(`${this.apiUrl}/ebookAleatoire`);
  }

  getPalVieillissante(): Observable<PalVieillissanteData[]> {
    return this.http.get<PalVieillissanteData[]>(`${this.apiUrl}/palVieillissante`);
  }

  getSerieASurveiller(): Observable<SeriesASurveillerData[]> {
    return this.http.get<SeriesASurveillerData[]>(`${this.apiUrl}/aSurveiller`);
  }

  getListeCourseLivrePapier(): Observable<ListeCourseLivreData[]> {
    return this.http.get<ListeCourseLivreData[]>(`${this.apiUrl}/listeCoursePapier`);
  }

  getListeCourseEbook(): Observable<ListeCourseLivreData[]> {
    return this.http.get<ListeCourseLivreData[]>(`${this.apiUrl}/listeCourseEbook`);
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
