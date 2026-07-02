import { Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-series',
  imports: [CommonModule, RouterLink],
  templateUrl: './series.html',
  styleUrl: './series.css',
})
export class Series implements OnInit {

  series: any[] = [];

  constructor(private serieService: Serie){}

  ngOnInit(): void {
    this.serieService.getSeries().subscribe(data => {
      console.log(data);
      this.series = data;
    })
  }

  getNombreLivresLus(livres: any[]): number {
    return livres.filter(livre => livre.statutLivre === 'LU').length;
  }

  getCarreaux(total: number, lus: number): string[] {
    return Array(total).fill('').map((_, i) => i < lus ? '■' : '□');
  }
}
