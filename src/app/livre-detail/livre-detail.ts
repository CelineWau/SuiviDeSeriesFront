import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../services/livre';
import { Serie } from '../services/serie';
import { ActivatedRoute } from '@angular/router';
import { LivreDetailData } from '../models/livre-detail';

@Component({
  selector: 'app-livre-detail',
  imports: [FormsModule],
  templateUrl: './livre-detail.html',
  styleUrl: './livre-detail.css',
})
export class LivreDetail implements OnInit{

  idSerie: number;
  idLivre: number;
  livre: LivreDetailData | null = null;

  constructor(private livreService: Livre, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private serieService: Serie) {
    this.idSerie = Number(this.route.snapshot.paramMap.get('serieId'));
    this.idLivre = Number(this.route.snapshot.paramMap.get('livreId'));
  }


  ngOnInit(): void {
    this.chargerLivre();
  }

  chargerLivre(): void {
    this.livreService.getLivre(this.idLivre).subscribe(data => {
      this.livre = data;
      this.cdr.detectChanges();
    });
  }
}