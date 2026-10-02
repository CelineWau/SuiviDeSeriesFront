import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Serie } from '../services/serie';
import { Router } from '@angular/router';
import { Genre } from '../services/genre';
import { GenreData } from '../models/genre';

@Component({
  selector: 'app-creer-serie',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './creer-serie.html',
  styleUrl: './creer-serie.css',
})
export class CreerSerie {

  serieForm: FormGroup;
  erreurServeur: string | null = null; 
  genres: GenreData[] = [];
  nouveauNomGenre: string = '';
  

  constructor(private fb: FormBuilder, private serieService: Serie, private genreService: Genre, private router: Router) {
    this.serieForm = this.fb.group({
      nom: ['', Validators.required],
      statutSerie: ['', Validators.required],
      nombreLivreTotal: ['', Validators.required],
      statutPublication: ['', Validators.required],
      natureSerie: ['NON_DEFINI', Validators.required],
      idGenre: [0]
    });
    this.chargerGenres();
  }

  chargerGenres(): void {
    this.genreService.getGenres().subscribe(data => {
      this.genres = data
    });
  }

  creerEtAssignerGenre(): void {
    this.genreService.creerGenre(this.nouveauNomGenre).subscribe(nouveauGenre => {
      this.genres.push(nouveauGenre);
      this.serieForm.patchValue({ idGenre: nouveauGenre.id });
      this.nouveauNomGenre = '';
    });
  }

  onSubmit(){
    if (this.serieForm.valid) {
      this.serieService.creerSerie(this.serieForm.value).subscribe({
        next: () => {
        this.router.navigateByUrl('/accueil', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/series']);
        });
      },
        error: (err) => {
          this.erreurServeur = err.error.message;
        }
      });
    } else {
      this.serieForm.markAllAsTouched();
    }
  }
}