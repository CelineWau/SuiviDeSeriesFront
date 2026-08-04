import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';
import { TailleSerieData } from '../models/taille-serie';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnInit{

  seriesLesPlusLongues: any;
  tailleSeries: TailleSerieData = {petites: 0, moyennes: 0, sagas: 0};

  constructor(private serieService: Serie, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerSeriesLesPlusLongues();
    this.chargerRepartitionTailleSeries();
  }

  chargerSeriesLesPlusLongues(): void {
    this.serieService.getSeriesLesPlusLongues().subscribe(data => {
      this.seriesLesPlusLongues = data;
      this.cdr.detectChanges();
    });
  }

  chargerRepartitionTailleSeries(): void {
    this.serieService.getRepartitionTailleSeries().subscribe(data => {
      this.tailleSeries = data;
      this.cdr.detectChanges();
    })
  }
}
