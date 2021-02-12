import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {QueryParams} from '../models/QueryParams';
import {ResponseAPI} from '../models/responseAPI';
import {Pokemon} from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private apiURI: string = environment.pokedexApiUrl + '/pokemons';

  constructor(private http: HttpClient) {
  }

  public getPokemons(params: QueryParams): Observable<ResponseAPI> {
    let httpParams = new HttpParams();
    Object.entries(params).filter(([k, v]) => v !== undefined).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value);
    });
    return this.http.get<ResponseAPI>(this.apiURI, {params: httpParams});
  }

  public getSpecialPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.apiURI + '/' + id);
  }
}
