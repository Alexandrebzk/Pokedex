import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PokemonModel} from '../models/pokemon.model';
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

  setTrainerTeam(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(this.apiURI, this.team, {headers});
  }

  getTrainerTeam(): Observable<any> {
    return this.http.get(this.apiURI).pipe(tap(res => this.team = res as any[]));
  }

  getTeamDetails(): Observable<PokemonModel[]> {
    const tmpTeam = this.team.map((id => this.pokemonsService.getPokemonById(`${id}`)));
    return forkJoin(tmpTeam as unknown as PokemonModel[]).pipe(tap(res => console.log(res)));
  }
}
