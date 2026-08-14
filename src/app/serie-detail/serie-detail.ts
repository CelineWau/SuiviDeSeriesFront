import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SerieDetailData } from '../models/serie-detail';
import { Serie } from '../services/serie';
import { ActivatedRoute } from '@angular/router';
import { Livre } from '../services/livre';
import { LivreDetailData } from '../models/livre-detail';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-serie-detail',
  imports: [FormsModule],
  templateUrl: './serie-detail.html',
  styleUrl: './serie-detail.css',
})
export class SerieDetail implements OnInit{

  idSerie: number;
  serie: SerieDetailData | null = null;
  tempsLecture: number = 0;
  modeEditionTotal: boolean = false;
  modeEditionNom: boolean = false;
  modeEditionStatutPublication: boolean = false;
  modeEditionStatutSerie: boolean = false;
  nouveauTotal: number = 0;
  nouveauNom: string = '';
  nouveauStatutPublication: 'EN_COURS' | 'TERMINEE' | 'INCONNU' = 'EN_COURS';
  nouveauStatutSerie : 'EN_COURS' | 'ABANDONNEE' | 'TERMINEE' = 'EN_COURS';

  constructor(private serieService: Serie, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private livreService: Livre){
    this.idSerie = Number(this.route.snapshot.paramMap.get('serieId'));
  }

  ngOnInit(): void {
    this.chargerSerie();
    this.chargerTempsLecture()
  }

  chargerSerie(): void {
    this.serieService.getSerie(this.idSerie).subscribe(data => {
      this.serie = data;
      this.cdr.detectChanges();
    });
  }

  chargerTempsLecture(): void {
    this.serieService.getTempsLecture(this.idSerie).subscribe(data => {
      this.tempsLecture = data;
      this.cdr.detectChanges();
    });
  }

  changerFormatLivre(livre: LivreDetailData): void {
    let nouveauFormat: 'EBOOK' | 'PAPIER';;
    if(livre.formatLivre === 'EBOOK') {
      nouveauFormat = 'PAPIER';
    } else {
      nouveauFormat = 'EBOOK';
    }
    this.livreService.modifierFormatLivre(livre.idLivre, nouveauFormat).subscribe(data => {
      livre.formatLivre = nouveauFormat;
    });
  }

  supprimerLivre(livre: LivreDetailData): void {
    const confirmation = confirm('Supprimer ce livre');
    if(confirmation) {
      this.livreService.supprimerLivre(livre.idLivre).subscribe(() => {
        this.serie!.livres = this.serie!.livres.filter(l => l.idLivre !== livre.idLivre)
        this.cdr.detectChanges();
      });
    }
  }

  ouvrirEditionTotal(): void {
    this.modeEditionTotal = true;
    this.nouveauTotal = this.serie!.nombreLivreTotal;
  }

  sauvegarderTotal(): void {
    this.serieService.modifierNombreLivreTotal(this.idSerie, this.nouveauTotal).subscribe(() => {
      this.serie!.nombreLivreTotal = this.nouveauTotal;
      this.modeEditionTotal = false;
      this.cdr.detectChanges();
    });
  }

  ouvrirEditionNom(): void {
    this.modeEditionNom = true;
    this.nouveauNom = this.serie!.nom;
  }

  sauvegarderNom(): void {
    this.serieService.modifierNomSerie(this.idSerie, this.nouveauNom).subscribe(() => {
      this.serie!.nom = this.nouveauNom;
      this.modeEditionNom = false;
      this.cdr.detectChanges();
    });
  }

  ouvrirEditionStatutPublication(): void {
    this.modeEditionStatutPublication = true;
    this.nouveauStatutPublication = this.serie!.statutPublication;
  }

  sauvegarderStatutPublication(): void {
    this.serieService.modifierStatutPublication(this.idSerie, this.nouveauStatutPublication).subscribe(() => {
      this.serie!.statutPublication = this.nouveauStatutPublication;
      this.modeEditionStatutPublication = false;
      this.cdr.detectChanges();
    });
  }

  ouvrirEditionStatutSerie(): void {
    this.modeEditionStatutSerie = true;
    this.nouveauStatutSerie = this.serie!.statutSerie;
  }

  sauvegarderStatutSerie(): void {
    this.serieService.modifierStatutSerie(this.idSerie, this.nouveauStatutSerie).subscribe(() => {
      this.serie!.statutSerie = this.nouveauStatutSerie;
      this.modeEditionStatutSerie = false;
      this.cdr.detectChanges();
    });
  }
}