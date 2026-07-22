export function calculerProportion(partiel: number, total: number): number {
    if (total === 0) {
        return 0;
    }
    return partiel / total;
}

export function calculerLongueurArc(proportions: number, rayon: number): number {
    return proportions * 2 * Math.PI * rayon;
}
