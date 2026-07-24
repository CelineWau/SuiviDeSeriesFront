import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectifAnnuelData } from '../models/objectif-annuel-data';

@Injectable({
  providedIn: 'root',
})
export class ObjectifAnnuel {

  private apiUrl = "http://localhost:8080/objectifAnnuel";

  constructor(private http: HttpClient) {}

  recupererObjectif(idUtilisateur: number): Observable<ObjectifAnnuelData | null> {
    return this.http.get<ObjectifAnnuelData | null>(`${this.apiUrl}?idUtilisateur=${idUtilisateur}`);
  }

  definirObjectif(idUtilisateur: number, valeurObjectif: number): Observable<ObjectifAnnuelData> {
    return this.http.post<ObjectifAnnuelData>(this.apiUrl, {idUtilisateur, valeurObjectif});
  }
}
