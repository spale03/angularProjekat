import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { KorisnikService } from '../../services/korisnik.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email: string = ''
  public password: string = ''

  constructor(private router: Router) {

    if (KorisnikService.getActiveKorisnik()) {
      router.navigate(['/user'])
      return
    }
  }

  public doLogin() {
    if (KorisnikService.login(this.email, this.password)) {
      // Redirect to user to profile
      this.router.navigate(['/user'])
      return
    }

    alert('Bad email or password')
  }
}
