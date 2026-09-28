export function traduireNatureSerie(nature: string): string {
    const traductions: Record<string, string> = {
        ROMAN: 'Roman',
        BANDE_DESSINE: 'Bande dessinée',
        COMICS: 'Comics',
        MANGA: 'Manga',
        BEAU_LIVRE: 'Beau-livre',
        NON_DEFINI: 'Non-défini',
    };
    return traductions[nature] ?? nature;
}