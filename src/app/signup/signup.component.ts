import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { KorisnikService } from '../../services/korisnik.service';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public email = ''
  public password = ''
  public repeatPassword = ''
  public firstName = ''
  public lastName = ''
  public phone = ''
  public address = ''


  public constructor(private router: Router) {
    
  }

  public doSignup() {
    if (this.email == '' || this.password == '') {
      alert('Email and password are required fields')
      return
    }

    if (this.password !== this.repeatPassword) {
      alert('Passwords dont match')
      return
    }

    const result = KorisnikService.createKorisnik({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      rezervacije: []
    })

    result ? this.router.navigate(['/login']) : alert('Email is already taken')
  }
}
