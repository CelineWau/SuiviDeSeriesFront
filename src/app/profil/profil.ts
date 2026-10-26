import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfilData } from '../models/profil';
import { ProfilUtilisateur } from '../services/profil-utilisateur';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil implements OnInit{

  profil: ProfilData | null = null;

  constructor(private profilService: ProfilUtilisateur, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.chargerProfil();
  }

  public chargerProfil(): void {
    this.profilService.getProfil().subscribe(data => {
      this.profil = data;
      this.cdr.detectChanges();
    });
  }
}
