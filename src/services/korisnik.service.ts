import { KorisnikModel } from "../models/korisnik.model"
import { StHelper } from "../utils/StorageHelper"
import { RezervacijaModel } from "../models/rezervacija.model";

export class KorisnikService {

    static retrieveListaKorisnika(): KorisnikModel[] {
        if (!StHelper.getItem('korisnici')) {
            const arr: KorisnikModel[] = [
                {
                    email: 'jovan@gmail.com',
                    firstName: 'Jovan',
                    lastName: 'Spasov',
                    phone: '066 543 345',
                    address: 'Vojvode Stepe 6',
                    password: 'asd',
                    rezervacije: []
                }
            ]
            StHelper.setItem('korisnici', arr);
        }

        return StHelper.getItem('korisnici')
    }

    static createKorisnik(model: KorisnikModel) {
        const korisnici = this.retrieveListaKorisnika()

        for (let korisnik of korisnici) {
            if (korisnik.email === model.email)
                return false
        }

        korisnici.push(model)
        StHelper.setItem('korisnici', korisnici);
        return true
    }

    static updateKorisnik(model: KorisnikModel) {
        const korisnici = this.retrieveListaKorisnika()
        for (let korisnik of korisnici) {
            if (korisnik.email === model.email) {
                korisnik.firstName = model.firstName
                korisnik.lastName = model.lastName
                korisnik.address = model.address
                korisnik.phone = model.phone

            }
        }

        StHelper.setItem('korisnici',korisnici)
    }

    static login(email: string, password: string): boolean {
        for (let korisnik of this.retrieveListaKorisnika()) {
            if (korisnik.email === email && korisnik.password === password) {
                StHelper.setItem('active', korisnik.email)
                return true
            }
        }

        return false
    }

    static getActiveKorisnik(): KorisnikModel | null {
        if (!StHelper.getItem('active'))
            return null

        for (let korisnik of this.retrieveListaKorisnika()) {
            if (korisnik.email == StHelper.getItem('active')) {
                return korisnik
            }
        }

        return null
    }

    static createRezervacija(order: RezervacijaModel) {
        const arr = this.retrieveListaKorisnika()
        for (let korisnik of arr) {
            if (korisnik.email == StHelper.getItem('active')) {
                // if 
                // broj karata za odredjeni film -> izracunaj da li se trenutni film nalazi u listi filmova korisnika koji nisu gledani(koji su rezervi)
                korisnik.rezervacije.push(order)
                StHelper.setItem('korisnici', arr)
                return true
            }
        }

        return false
    }

    static changeRezervacijaStatus(state: 'rezervisano' | 'gledano' | 'otkazano', id: string) {
        const active = this.getActiveKorisnik()
        if (active) {
            const arr = this.retrieveListaKorisnika()
            for (let korisnik of arr) {
                if (korisnik.email == active.email) {
                    for (let rezervacija of korisnik.rezervacije) {
                        if (rezervacija.id == id) {
                            rezervacija.status_rezervacije = state
                        }
                    }
                    StHelper.setItem('korisnici', arr)
                    return true
                }
            }
        }
        return false
    }

    static changeRating(r: number, id: string) {
        const active = this.getActiveKorisnik()
        if (active) {
            const arr = this.retrieveListaKorisnika()
            for (let korisnik of arr) {
                if (korisnik.email == active.email) {
                    for (let rezervacija of korisnik.rezervacije) {
                        if (rezervacija.id == id && rezervacija.status_rezervacije == 'gledano') {
                            rezervacija.recenzija = r
                        }
                    }
                    StHelper.setItem('korisnici', arr)
                    return true
                }
            }
        }
        return false
    }

    static changePassword(newPassword: string): boolean {

        const arr = this.retrieveListaKorisnika()
        for (let korisnik of arr) {
            if (korisnik.email == StHelper.getItem('active')) {
                korisnik.password = newPassword
                StHelper.setItem('korisnici', arr)
                return true
            }
        }

        return false
    }
    


}
