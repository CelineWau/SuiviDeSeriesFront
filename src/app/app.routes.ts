import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Series } from './series/series';
import { Livre } from './livre/livre';
import { Profil } from './profil/profil';
import { Login } from './login/login';
import { CreerSerie } from './creer-serie/creer-serie';
import { CreerLivre } from './creer-livre/creer-livre';

export const routes: Routes = [
    { path: 'accueil', component: Home},
    { path: 'series', component: Series},
    { path: 'livre', component: Livre},
    { path: 'profil', component: Profil},
    { path: '', component: Login},
    { path: 'series/creer', component: CreerSerie},
    { path: 'livres/creer/:serieId', component: CreerLivre}
];
