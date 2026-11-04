import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfilData } from '../models/profil';
import { ProfilUtilisateur } from '../services/profil-utilisateur';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  imports: [FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil implements OnInit{

  profil: ProfilData | null = null;
  modeEditionEmail: boolean = false;
  modeEditionMdp: boolean = false;
  nouvelEmail: string = '';
  ancienMdp: string = '';
  nouveauMdp: string = '';
  confirmationMdp: string = '';
  erreurEmail: string | null = null;
  erreurMdp: String | null = null;
  succesMdp : boolean = false;
  afficherMdp: boolean = false; 

  constructor(private profilService: ProfilUtilisateur, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerProfil();
  }

  chargerProfil(): void {
    this.profilService.getProfil().subscribe(data => {
      this.profil = data;
      this.cdr.detectChanges();
    });
  }

  ouvrirEditionEmail(): void {
    this.modeEditionEmail = true;
    this.nouvelEmail = this.profil!.email;
    this.erreurEmail = null;
  }

  sauvegarderEmail(): void {
    this.profilService.modifierEmail(this.nouvelEmail).subscribe({
      next: (data) => {
        this.profil = data;
        this.modeEditionEmail = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erreurEmail = err.error.message;
        this.cdr.detectChanges();
      }
    });
  }

  ouvrirEditionMdp(): void {
    this.modeEditionMdp = true;
    this.erreurMdp = null;
    this.succesMdp = false;
  }

  annulerEditionMdp(): void {
    this.modeEditionMdp = false;
    this.ancienMdp = '';
    this.nouveauMdp = '';
    this.confirmationMdp = '';
    this.erreurMdp = null;
  }

  sauvegarderMdp(): void {
    if(this.nouveauMdp !== this.confirmationMdp) {
      this.erreurMdp = "Le nouveau mot de passe et sa confirmation sont différents."
      this.cdr.detectChanges();
      return;
    }

    this.profilService.modifierMdp(this.ancienMdp, this.nouveauMdp).subscribe({
      next: (data) => {
        this.modeEditionMdp = false;
        this.ancienMdp = '';
        this.nouveauMdp = '';
        this.confirmationMdp = '';
        this.erreurMdp = null;
        this.succesMdp = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.erreurMdp = err.error?.message ?? "Une erreur est survenue, réessaie plus tard.";
        this.cdr.detectChanges();
      },
    })
  }

  basculerAffichageMdp(): void {
    this.afficherMdp = !this.afficherMdp;
  }
}
