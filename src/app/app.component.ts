import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { StHelper } from '../utils/StorageHelper';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public service = KorisnikService

  public constructor(private router: Router) {}

  public doLogout() {
    StHelper.removeItem('active')
    this.router.navigate(['/login'])
  }
}
