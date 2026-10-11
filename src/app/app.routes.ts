import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Series } from './series/series';
import { Livre } from './livre/livre';
import { Profil } from './profil/profil';
import { Login } from './login/login';
import { CreerSerie } from './creer-serie/creer-serie';
import { CreerLivre } from './creer-livre/creer-livre';
import { Stats } from './stats/stats';
import { SerieDetail } from './serie-detail/serie-detail';
import { LivreDetail } from './livre-detail/livre-detail';
import { authGuard, dejaConnecteGuard } from './auth-guard';

export const routes: Routes = [
    { path: 'accueil', component: Home, canActivate: [authGuard]},
    { path: 'series', component: Series, canActivate: [authGuard]},
    { path: 'livre', component: Livre, canActivate: [authGuard]},
    { path: 'profil', component: Profil, canActivate: [authGuard]},
    { path: '', component: Login, canActivate: [dejaConnecteGuard] },
    { path: 'series/creer', component: CreerSerie, canActivate: [authGuard]},
    { path: 'livres/creer/:serieId', component: CreerLivre, canActivate: [authGuard]},
    { path: 'stats', component: Stats, canActivate: [authGuard]},
    { path: 'series/:serieId', component: SerieDetail, canActivate: [authGuard]},
    { path: 'livres/modifier/:serieId/:livreId', component: LivreDetail, canActivate: [authGuard]},
];
