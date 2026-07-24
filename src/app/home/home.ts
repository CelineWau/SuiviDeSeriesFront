import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Serie } from '../services/serie';
import { RepartitionFormat } from '../models/repartition-format';
import { Livre } from '../services/livre';
import { calculerLongueurArc, calculerProportion } from '../utils/camembert';
import { ObjectifAnnuelData } from '../models/objectif-annuel-data';
import { ObjectifAnnuel } from '../services/objectif-annuel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  series: any[] = [];
  seriesPresqueFinies: any[] = [];
  seriesAvecLivresAAcheter: any[] = [];
  repartitionFormat: RepartitionFormat = { luEbook: 0, luPapier: 0, palEbook: 0, palPapier: 0 };
  longueurArcLuEbook: number = 0;
  longueurArcPalEbook: number = 0;
  compteurSerieParAnnee: number = 0;
  objectifAnnuelData: ObjectifAnnuelData | null = null;
  nouvelObjectif: number = 12
  idUtisateur = 1;

  constructor(private serieService: Serie, private livreService : Livre, private objectifAnnuel: ObjectifAnnuel, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerSerie();
    this.chargerSeriesPresqueFinies();
    this.chargerSeriesAvecLivresAAcheter();
    this.chargerCalculRepartitionFormat();
    this.chargerCompteurSeriesParAnnee();
    this.chargerObjectifAnnuel()
  }
  
  chargerSerie():void {
    this.serieService.getSeries().subscribe(data => {
        this.series = data;
        this.cdr.detectChanges();
    })
  }

  chargerSeriesPresqueFinies(): void {
    this.serieService.getSeriesPresqueFiniesPal(2).subscribe(data => {
      this.seriesPresqueFinies = data;
      this.cdr.detectChanges();
    });
  }

  chargerSeriesAvecLivresAAcheter(): void {
    this.serieService.getSeriesAvecLivresAAcheter().subscribe(data => {
      this.seriesAvecLivresAAcheter = data;
      this.cdr.detectChanges();
    })
  }

  chargerCalculRepartitionFormat(): void {
    this.livreService.calculerRepartitionFormat().subscribe(data => {
      this.repartitionFormat = data;

      const totalLu = data.luEbook + data.luPapier;
      const proportionLuEbook = calculerProportion(data.luEbook, totalLu);
      this.longueurArcLuEbook = calculerLongueurArc(proportionLuEbook, 40);

      const totalPal = data.palEbook + data.palPapier;
      const proportionPalEbook = calculerProportion(data.palEbook, totalPal);
      this.longueurArcPalEbook = calculerLongueurArc(proportionPalEbook, 40);

      this.cdr.detectChanges();
    })
  }

  chargerCompteurSeriesParAnnee(): void {
    this.serieService.getCompteurSerieParAnnee().subscribe(data => {
      this.compteurSerieParAnnee = data;
      this.cdr.detectChanges();
    })
  }

  chargerObjectifAnnuel(): void {
    this.objectifAnnuel.recupererObjectif(this.idUtisateur).subscribe(data => {
      this.objectifAnnuelData = data;
      this.cdr.detectChanges();
    });
  }

  definirObjectif(): void {
    this.objectifAnnuel.definirObjectif(this.idUtisateur, this.nouvelObjectif).subscribe(data => {
      this.objectifAnnuelData = data;
      this.cdr.detectChanges();
    });
  }

  pourcentageProgression(): number {
    if (!this.objectifAnnuelData || this.objectifAnnuelData.valeurObjectif === 0) {
      return 0;
    }
    const pourcentage = (this.compteurSerieParAnnee / this.objectifAnnuelData.valeurObjectif) * 100;
    return Math.min(pourcentage, 100);
  }
}