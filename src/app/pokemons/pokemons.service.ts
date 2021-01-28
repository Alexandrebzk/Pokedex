import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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
    if (params.search !== undefined) {
      console.log('CALL : {search : ' + params.search + '}');
      return this.http.get<ResponseAPI>(this.apiURI + '?search=' + params.search);
    } else if (params.offset !== undefined && params.limit !== undefined) {
      console.log('CALL : {offset : ' + params.offset + ', limit : ' + params.limit + '}');
      return this.http.get<ResponseAPI>(this.apiURI + '?offset=' + params.offset + '&limit=' + params.limit);
    }
    return this.http.get<ResponseAPI>(this.apiURI);
  }

  public getSpecialPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.apiURI + '/' + id);
  }
}
