import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Series } from './series/series';
import { Livre } from './livre/livre';
import { Profil } from './profil/profil';
import { Login } from './login/login';

export const routes: Routes = [
    { path: 'accueil', component: Home},
    { path: 'series', component: Series},
    { path: 'livre', component: Livre},
    { path: 'profil', component: Profil},
    { path: '', component: Login},
];
