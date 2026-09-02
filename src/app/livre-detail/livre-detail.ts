import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livre } from '../services/livre';
import { Serie } from '../services/serie';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LivreDetailData } from '../models/livre-detail';
import { ModifierLivreData } from '../models/modifier-livre';

@Component({
  selector: 'app-livre-detail',
  imports: [FormsModule, RouterLink],
  templateUrl: './livre-detail.html',
  styleUrl: './livre-detail.css',
})
export class LivreDetail implements OnInit{

  idSerie: number;
  idLivre: number;
  livre: LivreDetailData | null = null;
  nouveauTitre: string = '';
  nouveauAuteur: string = '';
  nouveauIsbn: string = '';
  nouveauNumero: number = 0;

  constructor(private livreService: Livre, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private serieService: Serie) {
    this.idSerie = Number(this.route.snapshot.paramMap.get('serieId'));
    this.idLivre = Number(this.route.snapshot.paramMap.get('livreId'));
  }


  ngOnInit(): void {
    this.chargerLivre();
  }

  chargerLivre(): void {
    this.livreService.getLivre(this.idLivre).subscribe(data => {
      this.livre = data;
      this.nouveauTitre = data.titre;
      this.nouveauAuteur = data.auteur;
      this.nouveauIsbn = data.isbn;
      this.nouveauNumero = data.numeroDansLaSerie;
      this.cdr.detectChanges();
    });
  }

  enregistrerModification(): void {
    const donneesModifiees: ModifierLivreData = {
      titre: this.nouveauTitre,
      auteur: this.nouveauAuteur,
      isbn: this.nouveauIsbn,
      numeroDansLaSerie: this.nouveauNumero
    };

    this.livreService.modifierLivre(this.idLivre, donneesModifiees).subscribe(data => {
      this.livre = data;
      this.cdr.detectChanges();
      this.router.navigate(['/series', this.idSerie]);
    })
  }
}