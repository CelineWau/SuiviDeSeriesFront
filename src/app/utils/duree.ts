export interface DureeDecomposee {
    annees: number;
    mois: number;
    jours: number;
}

export function decomposerDureeEnJours(totalJours: number): DureeDecomposee {
    const annees = Math.floor(totalJours / 365);
    const resteApresAnnees = totalJours % 365;

    const mois = Math.floor(resteApresAnnees / 30);
    const jours = Math.floor(resteApresAnnees % 30);

    return {annees, mois, jours}
}