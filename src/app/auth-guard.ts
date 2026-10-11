import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authSerice = inject(Auth);
  const router = inject(Router);

  if(authSerice.estConnecte()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};


export const dejaConnecteGuard: CanActivateFn = (route, state) => {
  const authSerice = inject(Auth);
  const router = inject(Router);

  if(authSerice.estConnecte()) {
    router.navigate(['/accueil']);
    return false;
  }

  return true;
};
