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
  nouvelEmail: string = '';
  erreurEmail: string | null = null;

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
    })
  }
}
