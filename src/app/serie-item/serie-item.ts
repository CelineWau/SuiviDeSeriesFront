import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livre } from '../services/livre';

@Component({
  selector: 'app-serie-item',
  imports: [RouterLink],
  templateUrl: './serie-item.html',
  styleUrl: './serie-item.css',
})
export class SerieItem {

  @Input() serie: any;
  @Output() serieModifiee = new EventEmitter<void>();
  @Output() supprimerSerie = new EventEmitter<number>();

  carreSelectionne: any = null;

  constructor(private livreService: Livre){}

  supprimer(id:number): void {
    this.supprimerSerie.emit(id);
  }

  getCarreaux(total: number, livres: any[], statutSerie: string): any[] {
    if (statutSerie === 'ABANDONNEE') {
      return Array.from({length: total}, (_, i) => {
        const livre = livres.find(l => l.numeroDansLaSerie === i + 1);
        return {
          symbole: livre?.statutLivre === 'LU' ? '■' : '□',
          livreId: livre?.idLivre,
          statut: livre?.statutLivre,
          classe: 'carre-abandonne'
        }
      })
    }
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
    if(carre.livreId && carre.statut !== 'LU') {
      this.carreSelectionne = carre;
    }
  }

  changerStatut(nouveauStatut: string): void {
    this.livreService.modifierStatutLivre(this.carreSelectionne.livreId, nouveauStatut).subscribe(() => {
      this.carreSelectionne = null;
      this.serieModifiee.emit();
    })
  }

  tousLesLivresEnregistres(serie: any): boolean {
    return (serie.livres?.length ?? 0) >= serie.nombreLivreTotal;
  }
}