# SuiviDeSeriesFront

Frontend Angular 21 (composants standalone, TypeScript) de l'application **Les Archives Dragonesques**, un outil de suivi de séries de livres. Le backend (Spring Boot) est ici : [SuiviDeSeries](https://github.com/CelineWau/SuiviDeSeries).

## Lancer le projet

Le backend doit tourner sur `http://localhost:8080`.

```bash
npm install
ng serve
```

L'application est disponible sur `http://localhost:4200`.

## Points techniques

- Authentification par JWT : intercepteur HTTP qui ajoute le token, gardes de routes (`authGuard` pour les pages protégées, garde inverse pour la page de connexion).
- Option « rester connecté » : le token est stocké dans `localStorage` ou `sessionStorage` selon le choix.
- Formulaires réactifs avec validation, messages d'erreur du serveur affichés à l'utilisateur.
- Tableau de bord avec graphiques en SVG calculés à la main (camemberts).