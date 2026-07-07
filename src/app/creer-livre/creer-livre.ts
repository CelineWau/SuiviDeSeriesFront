import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Livre } from '../services/livre';
import { Serie } from '../services/serie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-livre',
  imports: [ReactiveFormsModule],
  templateUrl: './creer-livre.html',
  styleUrl: './creer-livre.css',
})
export class CreerLivre implements OnInit {

  livreForm: FormGroup;
  series: any[] = [];

  constructor(private fb: FormBuilder, private livreService: Livre, private serieService: Serie, private router: Router) {
    this.livreForm = this.fb.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      isbn: ['', Validators.required],
      numeroDansLaSerie: ['', Validators.required],
      statutLivre: ['', Validators.required],
      serieId: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.livreForm.valid){
      this.livreService.creerLivre(this.livreForm.value).subscribe(() => {
        this.router.navigate(['/series']);
      });
    }
  }

  ngOnInit(): void {
    this.serieService.getSeries().subscribe(data => {
      this.series = data;
    });
  }
}
