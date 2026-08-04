import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnInit{

  seriesLesPlusLongues: any;

  constructor(private serieService: Serie, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerSeriesLesPlusLongues()
  }

  chargerSeriesLesPlusLongues(): void {
    this.serieService.getSeriesLesPlusLongues().subscribe(data => {
      this.seriesLesPlusLongues = data;
      this.cdr.detectChanges();
    });
  }
}
