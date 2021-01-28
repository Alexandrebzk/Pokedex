import {Component, OnInit} from '@angular/core';
import {PokemonsService} from '../pokemons.service';
import {Observable} from 'rxjs';
import {Pokemon} from '../../models/Pokemon';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Observable<Pokemon[]> = new Observable<Pokemon[]>();

  constructor(private pokemonsService: PokemonsService) {
  }

  ngOnInit(): void {
    this.pokemons = this.pokemonsService.getPokemons({}).pipe(map((v) => v.data as Pokemon[]));
    this.pokemons.subscribe((res) => console.log(res));
  }

}
