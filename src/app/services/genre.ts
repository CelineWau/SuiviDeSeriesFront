import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GenreData } from "../models/genre";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class Genre {

    private apiUrl = "http://localhost:8080/genres";

    constructor (private http: HttpClient) {}

    creerGenre(nom: string): Observable<GenreData> {
        return this.http.post<GenreData>(this.apiUrl, {nom: nom});
    }

    getGenres(): Observable<GenreData[]> {
        return this.http.get<GenreData[]>(this.apiUrl);
    }
}