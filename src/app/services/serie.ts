import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray } from 'rxjs';
import { RepartitionStatutSerieData } from '../models/repartition-statut-serie';
import { TailleSerieData } from '../models/taille-serie';
import { EbookALeatoireData } from '../models/ebook-aleatoire';
import { PalVieillissanteData } from '../models/pal-vieillissante';
import { SeriesASurveillerData } from '../models/serie-a-surveiller';
import { ListeCourseLivreData } from '../models/liste-course-livre';
import { SerieDetailData } from '../models/serie-detail';
import { SeriesPlusLonguePlusCourteData } from '../models/series-plus-longue-plus-courte';

@Injectable({
  providedIn: 'root',
})
export class Serie {

  private apiUrl = "http://localhost:8080/series";

  constructor (private http: HttpClient) {}

  getSeries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSerie(id: number): Observable<SerieDetailData> {
    return this.http.get<SerieDetailData>(`${this.apiUrl}/${id}`)
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

  getTempsLecture(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/tempsLecture`);
  }

  getCompteurSeriesCommenceesParAnnee(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/compteurSeriesCommenceesParAnnee`);
  }

  getRatioSeriesCommenceesEtFiniesMemeAnnee(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/ratioSeriesCommenceesEtFiniesParAnnee`);
  }

  getNombreSeriesAvecSeulTomeUnLuDansAnnee(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/nombreSeriesAvecQueTomeUnLuDansAnnee`);
  }

  getSeriesTermineesPlusLonguePlusCourte(): Observable<SeriesPlusLonguePlusCourteData> {
    return this.http.get<SeriesPlusLonguePlusCourteData>(`${this.apiUrl}/seriesTermineesPlusLonguePlusCourte`)
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

  modifierNomSerie(id: number, nouveauNom: string): Observable<SerieDetailData> {
    return this.http.patch<SerieDetailData>(`${this.apiUrl}/${id}/nom`, {nom: nouveauNom});
  }
}
