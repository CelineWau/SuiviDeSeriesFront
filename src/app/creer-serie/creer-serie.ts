import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Serie } from '../services/serie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-serie',
  imports: [ReactiveFormsModule],
  templateUrl: './creer-serie.html',
  styleUrl: './creer-serie.css',
})
export class CreerSerie {

  serieForm: FormGroup;

  constructor(private fb: FormBuilder, private serieService: Serie, private router: Router) {
    this.serieForm = this.fb.group({
      nom: ['', Validators.required],
      statutSerie: ['', Validators.required],
      nombreLivreTotal: ['', Validators.required],
      utilisateurId: [1]
    });
  }

  onSubmit(){
    if (this.serieForm.valid) {
      this.serieService.creerSerie(this.serieForm.value).subscribe(() => {
        this.router.navigateByUrl('/accueil', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/series']);
        });
      });
    }
  }
}
