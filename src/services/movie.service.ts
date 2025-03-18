import axios, { AxiosResponse } from 'axios'
import { MovieModel } from '../models/movies.model'
import { MovieDetailModel } from '../models/moviedetail.model'
import { StHelper } from '../utils/StorageHelper'



const movieClient = axios.create({
  baseURL: 'https://jsonfakery.com/movies',
  headers: {
    Accept: 'application/json',
    'X-Client-Name': 'Projekat Filmovi'
  },
  validateStatus: (status: number) => {
    return status === 200

  }
})

const movieDetailClient = axios.create({
  baseURL: 'https://www.omdbapi.com/?apikey=924faf75',
  headers: {
    Accept: 'application/json'
  },
  validateStatus: (status: number) => {
    return status === 200
   
  }
})

export class MovieService {
  private static key = 'movies'

  static async retrieveMovies (): Promise<MovieModel[]> {
    if (!StHelper.getItem(this.key)) {

      let { data } = await this.getMovieList()
      StHelper.setItem(this.key, data);
    }

    return StHelper.getItem(this.key)
  }

  static async retrieveMovieDetail(name:string):Promise<MovieDetailModel>{
    let key = 'movieDetail';
   
    if(!StHelper.getItem(key)){
      let {data} = await this.getMovieDetailByName(name);
      StHelper.setItem(key, [data]);
    }

    const arr:MovieDetailModel[] = StHelper.getItem(key);
    if(!arr.find(e => e.Title == name)){
      let {data} = await this.getMovieDetailByName(name);
      arr.push(data)
      StHelper.setItem(key, arr);
    }

    return arr.find(e => e.Title == name)!;
  }

  private static async getMovieList ()  {
    return movieClient.get<MovieModel[]>('/random/20')
  }

  private static async getMovieDetailByName (
    name: string
  ) {
    return movieDetailClient.request<MovieDetailModel>({
      params: {
        t: name
      }
    })
  }
}
