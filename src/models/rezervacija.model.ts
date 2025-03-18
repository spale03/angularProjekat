import { MovieDetailModel } from "./moviedetail.model"


// Sta sadrzi order za bioskop??
/**
 *  1. Datum Projekcije => date + 1/2/3
 *  2. Status rezervacije: 'rezervisano' | 'gledano' | 'otkazano'
 *  3. Cena => (MovieDetail[BoxOffice] / MovieDetail[imdbVotes]) / 10
 *  4. Naziv filma/detalji
 *  5. imdbRatign
 *  6. count
 *  7. personalRating => change to numeral
 *  8. id
 *  9. imdbId
 */
export interface RezervacijaModel {
  id:string
  detalji_filma: MovieDetailModel
  datum_projekcije: Date
  cena: number
  naziv_filma:string
  broj_karata: number
  recenzija:number | null
  status_rezervacije: 'rezervisano' | 'gledano' | 'otkazano'
}
