import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Serie {

  private apiUrl = "http://localhost:8080/series";

  constructor (private http: HttpClient) {}

  getSeries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  creerSerie(serieData:any): Observable<any> {
    return this.http.post<any>(this.apiUrl, serieData);
  }
}
