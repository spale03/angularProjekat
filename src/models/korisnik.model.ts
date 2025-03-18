import { RezervacijaModel } from "./rezervacija.model"

export interface KorisnikModel {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  password: string
  rezervacije: RezervacijaModel[]
}
