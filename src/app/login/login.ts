import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  connexionForm: FormGroup;
  inscriptionForm: FormGroup;
  modeInscription: boolean = false;
  erreurServeur: string | null = null; 

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
    this.connexionForm = this.fb.group({
      pseudo: ['', Validators.required],
      mdp: ['', Validators.required],
      resterConnecte: [false]
    });
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      pseudo: ['', Validators.required],
      email: ['', Validators.email],
      mdp: ['', Validators.required]
    });
  }

  basculerModeInscription(): void {
    this.modeInscription = true;
  }

  basculerModeConnexion(): void {
    this.modeInscription = false;
  }

  seConnecter(): void {
    if(this.connexionForm.valid) {
      const {pseudo, mdp, resterConnecte} = this.connexionForm.value;
      this.authService.connecterUtilisateur(pseudo, mdp, resterConnecte).subscribe({
        next: (reponse) => {
          this.authService.stockerToken(reponse.token, resterConnecte);
          this.router.navigate(['/accueil']);
        },
        error: (err) => {
          this.erreurServeur = "Pseudo ou mot de passe incorrect.";
        }
      });
    } else {
      this.connexionForm.markAllAsTouched();
    }
  }

  sInscrire(): void {
    if(this.inscriptionForm.valid) {
      this.authService.inscrireUtilisateur(this.inscriptionForm.value).subscribe({
        next: (reponse) => {
          this.authService.stockerToken(reponse.token, false);
          this.router.navigate(['/accueil']);
        },
        error: (err) => {
          this.erreurServeur = err.error.message;
        }
      });
    } else {
      this.inscriptionForm.markAllAsTouched();
    }
  }
}
