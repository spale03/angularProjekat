import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MovieService } from '../../services/movie.service';
import { MovieDetailModel } from '../../models/moviedetail.model';
import { KorisnikService } from '../../services/korisnik.service';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, NgIf, MatInputModule, MatButtonModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  public movie!: MovieDetailModel 
  public selectedTicketCount: number = 1
  public selectedPrice: number = 10

  public constructor(private route: ActivatedRoute, public utils: UtilsService, private router: Router) {
    route.params.subscribe(params => {
      MovieService.retrieveMovieDetail(params['title'])
        .then(rsp => {
          this.movie = rsp
        })
    })
  }
  private generateUUID() { 
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  public doOrder() {
    Swal.fire({
      title: `Place an order to ${this.movie.Title}?`,
      text: "Orders can be canceled any time from your user profile!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        popup: 'bg-dark'
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, place an order!"
    }).then((result) => {
      if (result.isConfirmed) {
        const result = KorisnikService.createRezervacija({
          id:this.generateUUID(),
          detalji_filma: this.movie!,
          broj_karata: this.selectedTicketCount,
          cena: this.selectedPrice,
          status_rezervacije: 'rezervisano',
          recenzija:null,
          datum_projekcije:new Date(),
          naziv_filma: this.movie.Title
        })
        result ? this.router.navigate(['/user']) :
          Swal.fire({
            title: "Failed creating an order",
            text: "Something is wrong with your order!",
            icon: "error"
          });
      }
    })
  }
}
