import { LivreDetailData } from "./livre-detail";

export interface SerieDetailData {
    idSerie: number;
    nom: string;
    nombreLivreTotal: number;
    statutSerie : 'EN_COURS' | 'TERMINEE' | 'ABANDONNEE';
    statutPublication : 'EN_COURS' | 'TERMINEE' | 'INCONNU';
    livres: LivreDetailData[];
    lireEnAnglais: boolean;
    natureSerie: 'ROMAN' | 'BANDE_DESSINE' | 'COMICS' | 'MANGA' | 'BEAU_LIVRE' | 'NON_DEFINI';
}