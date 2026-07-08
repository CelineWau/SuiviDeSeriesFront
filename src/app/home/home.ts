import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Serie } from '../services/serie';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  series: any[] = [];

  constructor(private serieService: Serie, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerSerie();
  }
  
  chargerSerie():void {
    this.serieService.getSeries().subscribe(data => {
        this.series = data;
        this.cdr.detectChanges();
    })
  }
}
