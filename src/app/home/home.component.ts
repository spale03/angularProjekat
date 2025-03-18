import { Component } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { UtilsService } from '../../services/utils.service'
import { LoadingComponent } from '../loading/loading.component'
import { RouterLink } from '@angular/router'
import { MovieModel } from '../../models/movies.model'
import { MovieService } from '../../services/movie.service'

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    LoadingComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public error!: string
  public movies!: MovieModel[]

  constructor(public utils: UtilsService) {
    MovieService.retrieveMovies().then(data => {
      this.movies = data
      
      console.log(data[0])
      
    })
  }
}
