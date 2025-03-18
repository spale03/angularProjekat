import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { KorisnikService } from '../../services/korisnik.service';
import { KorisnikModel } from '../../models/korisnik.model';
import { RezervacijaModel } from '../../models/rezervacija.model';

@Component({
  selector: 'app-user',
  imports: [
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    RouterLink,
    MatExpansionModule,
    MatAccordion,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  public displayedColumns: string[] = ['naziv_filma', 'datum_projekcije', 'broj_karata', 'cena', 'total', 'status_rezervacije', 'recenzija', 'actions'];
  public korisnik!: KorisnikModel
  public korisnikCopy!: KorisnikModel
  public recenzija: number | null = null

  public oldPasswordValue = ''
  public newPasswordValue = ''
  public repeatPasswordValue = ''


  constructor(private router: Router) {
    if (!KorisnikService.getActiveKorisnik()) {
      // Korisnik aplikacije nije ulogovan
      // Vrati korisnika na homepage
      router.navigate(['/home'])
      return
    }

    this.korisnik = KorisnikService.getActiveKorisnik()!
    this.korisnikCopy = KorisnikService.getActiveKorisnik()!

    console.table(this.korisnik.rezervacije)

  }
  // change passworda
  public doChangePassword() {
    if (this.oldPasswordValue == '' || this.newPasswordValue == null) {
      alert('Password cant be empty')
      return
    }

    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Password dont match')
      return
    }

    if (this.oldPasswordValue !== this.korisnik?.password) {
      alert('Password dont match')
      return
    }

    alert(
      KorisnikService.changePassword(this.newPasswordValue) ?
        'Password has been changed' : 'Failed to change password'
    )

    this.oldPasswordValue = ''
    this.newPasswordValue = ''
    this.repeatPasswordValue = ''
  }
  // provera usera
  public doUpdateUser() {
    if (this.korisnikCopy == null) {
      alert('User not defined')
      return
    }
    // update usera
    KorisnikService.updateKorisnik(this.korisnikCopy)
    this.korisnik = KorisnikService.getActiveKorisnik()!
    alert('User was updated')
  }
  // placanje rezervacije
  public doPay(order: RezervacijaModel) {
    if (KorisnikService.changeRezervacijaStatus('gledano', order.id)) {
      this.korisnik = KorisnikService.getActiveKorisnik()!
    }
  }
  // cancel rezervacije
  public doCancel(order: RezervacijaModel) {
    if (KorisnikService.changeRezervacijaStatus('otkazano', order.id)) {
      this.korisnik = KorisnikService.getActiveKorisnik()!
    }
  }
  // rating filma
  public doRating(rezervacija: RezervacijaModel) {
    if (KorisnikService.changeRating(rezervacija.recenzija!, rezervacija.id)) {
      this.korisnik = KorisnikService.getActiveKorisnik()!
    }

  }
}
