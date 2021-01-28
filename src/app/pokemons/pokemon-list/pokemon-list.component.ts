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

  pokemons: Pokemon[] = [];
  limit = 20;

  constructor(private pokemonsService: PokemonsService) {
  }

  ngOnInit(): void {
    this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).subscribe((res) => {
        this.pokemons = res.data;
        this.limit = res.limit;
      }
    );
  }

  onScroll(): void {
    this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).subscribe((res) => {
      console.log(res);
      this.pokemons = [...this.pokemons.concat(res.data)];
      this.limit = res.limit;
      console.log('new pokemons : ');
      console.log(this.pokemons);
    });
  }
}
