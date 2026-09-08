export interface CreerLivreData {
    titre: string;
    auteur: string;
    isbn: string;
    numeroDansLaSerie: number;
    statutLivre: 'LU' | 'DANS_PAL' | 'A_ACHETER';
    formatLivre: 'EBOOK' | 'PAPIER';
    dateAcquisition: string;
    dateLecture: string;
    serieId: number;
}