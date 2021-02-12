import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Pokemon} from '../models/Pokemon';
import {PokemonsService} from '../pokemons/pokemons.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiURI = environment.pokedexApiUrl + '/trainers/me/team';
  team: number[] = [];

  constructor(private http: HttpClient, private pokemonsService: PokemonsService) {
  }

  createTrainer(): void {
    // TODO
  }

  setTrainerTeam(accessToken: string | undefined): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });
    return this.http.put(this.apiURI, this.team, {headers});
  }

  getTrainerTeam(accessToken: string | undefined): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    });
    return this.http.get(this.apiURI, {headers}).pipe(tap(res => this.team = res as any[]));
  }

  retrieveTeam(): Observable<Pokemon[]> {
    const tmpTeam = this.team.map((id => this.pokemonsService.getSpecialPokemon(`${id}`)));
    return forkJoin(tmpTeam as unknown as Pokemon[]).pipe(tap(res => console.log(res)));
  }
}
