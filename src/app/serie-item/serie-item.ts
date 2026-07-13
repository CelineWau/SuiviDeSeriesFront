import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Livre } from '../services/livre';
import { Serie } from '../services/serie';

@Component({
  selector: 'app-serie-item',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './serie-item.html',
  styleUrl: './serie-item.css',
})
export class SerieItem {

  @Input() serie: any;
  @Output() serieModifiee = new EventEmitter<void>();
  @Output() supprimerSerie = new EventEmitter<number>();

  series: any[] = [];
  carreSelectionne: any = null;
  serieEnEdition: any = null;
  nouveauTotal: number = 0;
  seriePublicationEnEdition: any = null;
  serieStatutEnEdition: any = null;

  constructor(private serieService: Serie, private livreService: Livre, private cdr: ChangeDetectorRef){}

  supprimer(id:number): void {
    this.supprimerSerie.emit(id);
  }

  getNombreLivresLus(livres: any[]): number {
    return livres.filter(livre => livre.statutLivre === 'LU').length;
  }

  getCarreaux(total: number, livres: any[], statutSerie: string): any[] {
    if (statutSerie === 'TERMINEE') {
      return Array(total).fill({ symbole: '■', livreId: null, statut: 'LU'});
    }
    return Array.from({length: total}, (_, i) => {
      const livre = livres.find(l => l.numeroDansLaSerie === i + 1);
      return {
        symbole: livre?.statutLivre === 'LU' ? '■' : '□',
        livreId: livre?.idLivre,
        statut: livre?.statutLivre,
        classe: livre?.statutLivre === 'LU' ? 'carre-lu' :
                livre?.statutLivre === 'DANS_PAL' ? 'carre-pal' :
                livre?.statutLivre === 'A_ACHETER' ? 'carre-acheter' : 'carre-vide'
      };
    });
  }
  
  ouvrirMenuStatut(carre: any): void {
    console.log('carre cliqué:', carre);
    if(carre.livreId) {
      this.carreSelectionne = carre;
      console.log('carreSelectionne:', this.carreSelectionne);
    }
  }

  changerStatut(nouveauStatut: string): void {
    this.livreService.modifierStatutLivre(this.carreSelectionne.livreId, nouveauStatut).subscribe(() => {
      this.carreSelectionne = null;
      this.serieModifiee.emit();
    })
  }

  ouvrirEditionTotal(serie: any): void {
    this.serieEnEdition = serie;
    this.nouveauTotal = serie.nombreLivreTotal;
  }

  sauvegarderTotal(): void {
    this.serieService.modifierNombreLivreTotal(this.serieEnEdition.idSerie, this.nouveauTotal).subscribe(() => {
      this.serieEnEdition = null;
      this.serieModifiee.emit();
    });
  }

  ouvrirEditionPublication(serie: any): void {
    this.seriePublicationEnEdition = serie;
  }

  sauvegarderPublication(event: Event): void {
    const nouveauStatut = (event.target as HTMLSelectElement).value;
    this.serieService.modifierStatutPublication(this.seriePublicationEnEdition.idSerie, nouveauStatut).subscribe(() => {
      this.seriePublicationEnEdition = null;
      this.serieModifiee.emit();
      this.cdr.detectChanges();
    });
  }

  ouvrirEditionStatutSerie(serie: any): void {
    this.serieStatutEnEdition = serie;
  }

  sauvegarderStatutSerie(event: Event): void {
    const nouveauStatut = (event.target as HTMLSelectElement).value;
    this.serieService.modifierStatutSerie(this.serieStatutEnEdition.idSerie, nouveauStatut).subscribe(() => {
      this.serieStatutEnEdition = null;
      this.serieModifiee.emit();
      this.cdr.detectChanges();
    })
  }
}
