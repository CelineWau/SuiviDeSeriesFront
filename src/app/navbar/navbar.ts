import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(Auth);
  private router = inject(Router);

  seDeconnecter(): void {
    this.authService.deconnecter();
    this.router.navigate(['/']);
  }
}
