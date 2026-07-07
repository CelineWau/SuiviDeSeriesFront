import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Livre } from '../services/livre';
import { Serie } from '../services/serie';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creer-livre',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './creer-livre.html',
  styleUrl: './creer-livre.css',
})
export class CreerLivre implements OnInit {

  livreForm: FormGroup;
  series: any[] = [];
  serieCourante: any;

  constructor(private fb: FormBuilder, private livreService: Livre, private serieService: Serie, private router: Router, private route: ActivatedRoute) {
    const serieId = this.route.snapshot.paramMap.get('serieId');
    this.livreForm = this.fb.group({
      titre: ['', Validators.required],
      auteur: ['', Validators.required],
      isbn: ['', Validators.required],
      numeroDansLaSerie: ['', Validators.required],
      statutLivre: ['', Validators.required],
      serieId: [{value: serieId, disabled: true}, Validators.required]
    });
  }

  onSubmit(){
    if (this.livreForm.valid){
      this.livreService.creerLivre(this.livreForm.getRawValue()).subscribe(() => {
        this.router.navigate(['/series']);
      });
    }
  }

  ngOnInit(): void {
    this.serieService.getSeries().subscribe(data => {
      this.series = data;
      this.serieCourante = data.find((s: any) => s.idSerie == this.route.snapshot.paramMap.get('serieId'));
      console.log('serieId URL:', this.route.snapshot.paramMap.get('serieId'));
      console.log('serieCourante:', this.serieCourante);
    });
  }
}
