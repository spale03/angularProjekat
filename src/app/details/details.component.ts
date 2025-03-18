import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../services/movie.service';
import { MovieDetailModel } from '../../models/moviedetail.model';

@Component({
  selector: 'app-details',
  imports: [NgIf, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  public movie!: MovieDetailModel

  public constructor(private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params => {
      MovieService.retrieveMovieDetail(params['title'])
        .then(rsp => {
          this.movie = rsp
          console.log(rsp)
        })
    })
  }

}
