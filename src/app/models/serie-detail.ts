import { LivreDetailData } from "./livre-detail";

export interface SerieDetailData {
    idSerie: number;
    nom: string;
    nombreLivreTotal: number;
    statutSerie : 'EN_COURS' | 'TERMINEE' | 'ABANDONNEE';
    statutPublication : 'EN_COURS' | 'TERMINEE' | 'INCONNU';
    livres: LivreDetailData[];
}