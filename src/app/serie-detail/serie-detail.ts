import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SerieDetailData } from '../models/serie-detail';
import { Serie } from '../services/serie';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Livre } from '../services/livre';
import { LivreDetailData } from '../models/livre-detail';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-serie-detail',
  imports: [FormsModule, RouterLink],
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
  modeEditionNatureSerie: boolean = false;
  nouveauTotal: number = 0;
  nouveauNom: string = '';
  nouveauStatutPublication: 'EN_COURS' | 'TERMINEE' | 'INCONNU' = 'EN_COURS';
  nouveauStatutSerie: 'EN_COURS' | 'ABANDONNEE' | 'TERMINEE' = 'EN_COURS';
  nouveauNatureSerie: 'ROMAN' | 'BANDE_DESSINE' | 'COMICS' | 'MANGA' | 'BEAU_LIVRE' | 'NON_DEFINI' = 'NON_DEFINI';

  constructor(private serieService: Serie, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private livreService: Livre){
    this.idSerie = Number(this.route.snapshot.paramMap.get('serieId'));
  }

  ngOnInit(): void {
    this.chargerSerie();
    this.chargerTempsLecture()
  }

  sauvegarderChamp<T>(nouvelleValeur: T, appelService: (valeur: T) => Observable<any>, appliquerLocalement: (valeur: T) => void, fermerEdition: () => void) {
    appelService(nouvelleValeur).subscribe(() => {
      appliquerLocalement(nouvelleValeur);
      fermerEdition();
      this.cdr.detectChanges();
    });
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
    let nouveauFormat: 'EBOOK' | 'PAPIER';
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
    this.sauvegarderChamp(
      this.nouveauTotal,
      (valeur) => this.serieService.modifierNombreLivreTotal(this.idSerie, valeur),
      (valeur) => this.serie!.nombreLivreTotal = valeur,
      () => this.modeEditionTotal = false
    );
  }

  ouvrirEditionNom(): void {
    this.modeEditionNom = true;
    this.nouveauNom = this.serie!.nom;
  }

  sauvegarderNom(): void {
    this.sauvegarderChamp(
      this.nouveauNom,
      (valeur) => this.serieService.modifierNomSerie(this.idSerie, valeur),
      (valeur) => this.serie!.nom = valeur,
      () => this.modeEditionNom = false
    );
  }

  ouvrirEditionStatutPublication(): void {
    this.modeEditionStatutPublication = true;
    this.nouveauStatutPublication = this.serie!.statutPublication;
  }

  sauvegarderStatutPublication(): void {
    this.sauvegarderChamp(
      this.nouveauStatutPublication,
      (valeur) => this.serieService.modifierStatutPublication(this.idSerie, valeur),
      (valeur) => this.serie!.statutPublication = valeur,
      () => this.modeEditionStatutPublication = false
    );
  }

  ouvrirEditionStatutSerie(): void {
    this.modeEditionStatutSerie = true;
    this.nouveauStatutSerie = this.serie!.statutSerie;
  }

  sauvegarderStatutSerie(): void {
    this.sauvegarderChamp(
      this.nouveauStatutSerie,
      (valeur) => this.serieService.modifierStatutSerie(this.idSerie, valeur),
      (valeur) => this.serie!.statutSerie = valeur,
      () => this.modeEditionStatutSerie = false
    );
  }

  toggleLireEnAnglais(serie: SerieDetailData): void {
    let nouveauLireEnAnglais: boolean = !serie.lireEnAnglais;

    this.serieService.modifierLireEnAnglais(serie.idSerie, nouveauLireEnAnglais).subscribe(data => {
      serie.lireEnAnglais = nouveauLireEnAnglais;
      this.cdr.detectChanges();
    });
  }

  ouvrirEditionNatureSerie(): void {
    this.modeEditionNatureSerie = true;
    this.nouveauNatureSerie = this.serie!.natureSerie;
  }

  sauvegarderNatureSerie(): void {
    this.sauvegarderChamp(
      this.nouveauNatureSerie,
      (valeur) => this.serieService.modifierNatureSerie(this.idSerie, valeur),
      (valeur) => this.serie!.natureSerie = valeur,
      () => this.modeEditionNatureSerie = false
    );
  }
}