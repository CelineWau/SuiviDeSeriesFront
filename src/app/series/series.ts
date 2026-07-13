import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Livre } from '../services/livre';
import { FormsModule } from '@angular/forms';
import { SerieItem } from '../serie-item/serie-item';

@Component({
  selector: 'app-series',
  imports: [CommonModule, RouterLink, FormsModule, SerieItem],
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series implements OnInit {

  series: any[] = [];

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

  supprimer(id: number): void {
    this.serieService.supprimerSerie(id).subscribe(() => {
      this.serieService.getSeries().subscribe(data => {
        this.series = data;
        this.cdr.detectChanges();
      });
    });
  }

  get seriesEnCours(): any[] {
    return this.series.filter( s => s.statutSerie === 'EN_COURS');
  }

  get seriesAbandonnee(): any[] {
    return this.series.filter( s => s.statutSerie === 'ABANDONNEE');
  }

  get seriesTerminee(): any[] {
    return this.series.filter( s => s.statutSerie === 'TERMINEE');
  }
}
