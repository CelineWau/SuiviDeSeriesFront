import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Livre } from '../services/livre';

@Component({
  selector: 'app-series',
  imports: [CommonModule, RouterLink],
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series implements OnInit {

  series: any[] = [];
  carreSelectionne: any = null;

  constructor(private serieService: Serie, private livreService: Livre, private router: Router, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerSeries();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.chargerSeries();
      }
    });
  }

  chargerSeries(): void {
    this.serieService.getSeries().subscribe(data => {
      this.series = data;
      this.cdr.detectChanges();
    });
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

  supprimer(id: number): void {
    this.serieService.supprimerSerie(id).subscribe(() => {
      this.serieService.getSeries().subscribe(data => {
        this.series = data;
        this.cdr.detectChanges();
      });
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
      this.chargerSeries();
    })
  }
}
