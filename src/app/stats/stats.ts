import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';
import { TailleSerieData } from '../models/taille-serie';
import { Livre } from '../services/livre';
import { AuteursSerieEnCours } from '../models/auteurs-series-en-cours';
import { decomposerDureeEnJours, DureeDecomposee } from '../utils/duree';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnInit{

  seriesLesPlusLongues: any;
  tailleSeries: TailleSerieData = {petites: 0, moyennes: 0, sagas: 0};
  auteursSeriesEnCours: AuteursSerieEnCours [] = [];
  dureeMoyenneLecture: number = 0;
  dureeDecomposee: DureeDecomposee = { annees: 0, mois: 0, jours: 0 };
  dureeMoyennePal: number = 0;
  dureeMoyennePalDecomposee: DureeDecomposee = {annees: 0, mois: 0, jours: 0};
  seriesCommenceesCetteAnnee: number = 0;

  constructor(private serieService: Serie, private livreService: Livre, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerSeriesLesPlusLongues();
    this.chargerRepartitionTailleSeries();
    this.chargerAuteursSeriesEnCours();
    this.chargerDureeMoyenneLectureSerie();
    this.chargerDureeMoyennePal();
    this.chargerSeriesCommenceesCetteAnnee();
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
    });
  }

  chargerAuteursSeriesEnCours(): void {
    this.livreService.getAuteursSeriesEnCours().subscribe(data => {
      this.auteursSeriesEnCours = data;
      this.cdr.detectChanges();
    });
  }

  chargerDureeMoyenneLectureSerie(): void {
    this.serieService.getDureeMoyenneLectureSerie().subscribe(data => {
      this.dureeDecomposee = decomposerDureeEnJours(data)
      this.dureeMoyenneLecture = data;
      this.cdr.detectChanges();
    });
  }

  chargerDureeMoyennePal(): void {
    this.livreService.getDureeMoyenneDansPal().subscribe(data => {
      this.dureeMoyennePalDecomposee = decomposerDureeEnJours(data)
      this.dureeMoyennePal = data;
      this.cdr.detectChanges();
    });
  }

  chargerSeriesCommenceesCetteAnnee(): void {
      this.serieService.getCompteurSeriesCommenceesParAnnee().subscribe(data => {
        this.seriesCommenceesCetteAnnee = data;
        this.cdr.detectChanges();
      });
  }
}
