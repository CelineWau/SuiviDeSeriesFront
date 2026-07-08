import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-series',
  imports: [CommonModule, RouterLink],
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series implements OnInit {

  series: any[] = [];

  constructor(private serieService: Serie, private router: Router, private cdr: ChangeDetectorRef){}

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

  getCarreaux(total: number, livres: any[], statutSerie: string): string[] {
    if (statutSerie === 'TERMINEE') {
      return Array(total).fill('■');
    }
    return Array.from({length: total}, (_, i) => {
      const livre = livres.find(l => l.numeroDansLaSerie === i + 1);
      return livre && livre.statutLivre === 'LU' ? '■' : '□';
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
}
