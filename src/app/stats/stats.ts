import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Serie } from '../services/serie';
import { TailleSerieData } from '../models/taille-serie';
import { Livre } from '../services/livre';
import { AuteursSerieEnCours } from '../models/auteurs-series-en-cours';
import { decomposerDureeEnJours, DureeDecomposee } from '../utils/duree';
import { DecimalPipe } from '@angular/common';
import { SeriesPlusLonguePlusCourteData } from '../models/series-plus-longue-plus-courte';
import { RepartitionCategorieData } from '../models/repartition-categorie';
import { traduireNatureSerie as traduireNature } from '../utils/nature-serie';

@Component({
  selector: 'app-stats',
  imports: [DecimalPipe],
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
  ratioSeriesCommenceesEtFiniesMemeAnnee: number = 0;
  nombreSeriesAvecSeulTomeUnLuDansAnnee: number = 0;
  seriesTermineesPlusLonguePlusCourte: SeriesPlusLonguePlusCourteData | null = null;
  dureePlusCourte: DureeDecomposee = {annees: 0, mois: 0, jours: 0};
  dureePlusLongue: DureeDecomposee = {annees: 0, mois: 0, jours: 0};
  repartitionCategorieGenre: RepartitionCategorieData[] = [];
  repartitionCategorieNature: RepartitionCategorieData[] = [];

  constructor(private serieService: Serie, private livreService: Livre, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerSeriesLesPlusLongues();
    this.chargerRepartitionTailleSeries();
    this.chargerAuteursSeriesEnCours();
    this.chargerDureeMoyenneLectureSerie();
    this.chargerDureeMoyennePal();
    this.chargerSeriesCommenceesCetteAnnee();
    this.chargerRatioSeriesCommenceesEtFiniesMemeAnnee();
    this.chargerNombreSeriesAvecSeulTomeUnLuDansAnnee();
    this.chargerSeriesTermineesPlusLonguePlusCourte();
    this.chargerRepartitionGenre();
    this.chargerRepartitionNature();
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

  chargerRatioSeriesCommenceesEtFiniesMemeAnnee(): void {
    this.serieService.getRatioSeriesCommenceesEtFiniesMemeAnnee().subscribe(data => {
      this.ratioSeriesCommenceesEtFiniesMemeAnnee = data;
      this.cdr.detectChanges();
    });
  }

  chargerNombreSeriesAvecSeulTomeUnLuDansAnnee(): void {
    this.serieService.getNombreSeriesAvecSeulTomeUnLuDansAnnee().subscribe(data => {
      this.nombreSeriesAvecSeulTomeUnLuDansAnnee = data;
      this.cdr.detectChanges();
    });
  }

  chargerSeriesTermineesPlusLonguePlusCourte(): void {
    this.serieService.getSeriesTermineesPlusLonguePlusCourte().subscribe(data => {
      if(data.serieTermineePlusCourte?.dureeLecture) {
        this.dureePlusCourte = decomposerDureeEnJours(data.serieTermineePlusCourte?.dureeLecture);
      }
      if(data.serieTermineePlusLongue?.dureeLecture) {
        this.dureePlusLongue = decomposerDureeEnJours(data.serieTermineePlusLongue?.dureeLecture);
      }
      this.seriesTermineesPlusLonguePlusCourte = data;
      this.cdr.detectChanges();
    });
  }

  chargerRepartitionGenre(): void {
    this.serieService.getRepartitionGenre().subscribe(data => {
      this.repartitionCategorieGenre = data;
      this.cdr.detectChanges();
    });
  }

    chargerRepartitionNature(): void {
    this.serieService.getRepartitionNature().subscribe(data => {
      this.repartitionCategorieNature = data;
      this.cdr.detectChanges();
    });
  }

  traduireNatureSerie(nature: string): string {
  return traduireNature(nature);
}

calculerLargeurBarre(nombre: number, categories: RepartitionCategorieData[]): number {
  const max = Math.max(...categories.map(c => c.nombreSerie), 1);
  return (nombre / max) * 100;
}
}