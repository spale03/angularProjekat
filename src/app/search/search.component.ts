import { Component } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { NgFor, NgIf } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { UtilsService } from '../../services/utils.service'
import { LoadingComponent } from '../loading/loading.component'
import { RouterLink } from '@angular/router'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MovieService } from '../../services/movie.service'
import { MovieModel } from '../../models/movies.model'
import { Gen } from '../../utils/weirdGenerators'

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatButtonModule,
    LoadingComponent,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  displayedColumns: string[] = [
    'title',
    'genre',
    'plot',
    'cena',
    'runTime',
    'director',
    'imdbRating',
    'actor',
    'released',
    'action'
  ]

  allData!: MovieModel[]
  dataSource: MovieModel[] | null = null
  userInput: string = ''
  dateOptions: number[] = []
  selectedDate: string | null = null
  genreOptions: string[] = []
  selectedGenre: string | null = null

  public constructor (public utils: UtilsService) {
    MovieService.retrieveMovies().then(data => {
      for (let m of data) {
        if (!m.actors) {
          m.actors = ''
        }
        for (let e of m.casts) {
          // add random actors
          m.actors += `${e.name},`
        }
        // add rand price
        m.price = Gen.addRandomPrice()
        // add rand genre
        m.genre = Gen.addRandomGenre();
        // add rand screentime
        m.screentime = `${Gen.getRndInteger(60,180)}min`;
        // add rand director
        m.director = Gen.getRandomItem(m.casts.map(e => e.name));
      }
      // console.log(data[0])

      this.allData = data
      this.dataSource = data
      this.generateSearchCriteria(this.allData)
    })
  }

  

  public generateSearchCriteria (source: MovieModel[]) {
    

    // Date filter selectors
    this.genreOptions = Gen.genre.sort()
    let currentGenreOptions = source.map(e => e.genre);
    this.genreOptions = this.genreOptions.filter(e => currentGenreOptions.includes(e));

    this.dateOptions = source
      .map(obj => new Date(obj.release_date).getFullYear()) // get just year for filtering
      .sort((a, b) => b - a) // upward or downward sort
      .filter((date: number, i: number, ar: any[]) => ar.indexOf(date) === i) // get distinct
  }

  public doReset () {
    this.userInput = ''
    
    this.selectedGenre = null;
    this.selectedDate = null
    this.dataSource = this.allData!
    this.generateSearchCriteria(this.allData!)
  }

  public doFilterChain () {
    if (this.allData == null) return

      this.dataSource = this.allData!
        .filter(obj => {
    //       // Input Field Search
          if (this.userInput == '') return true
          return obj.actors!.toLowerCase().includes(this.userInput.toLowerCase()) ||
            obj.overview.toLowerCase().includes(this.userInput.toLowerCase()) ||
            obj.original_title.toLowerCase().includes(this.userInput.toLowerCase()) ||
            obj.screentime!.toLowerCase().includes(this.userInput.toLowerCase())
        })
        .filter(obj => {
          // Destintination Search
          if (this.selectedGenre == null) return true
          return obj.genre === this.selectedGenre
        })
    
        .filter(obj => {
          // Date Search
          if (this.selectedDate == null) return true
          const start = new Date(`${this.selectedDate}T00:00:01`).getFullYear()
          const end = new Date(`${this.selectedDate}T23:59:59`).getFullYear()
          const scheduled = new Date(obj.release_date).getFullYear()

          return (start <= scheduled) && (scheduled <= end)
        })

      this.generateSearchCriteria(this.dataSource)
  }
}
