import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PokemonsService} from '../pokemons.service';
import {Observable} from 'rxjs';
import {Pokemon} from '../../models/Pokemon';
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {FromEventTarget} from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements AfterViewInit {

  pokemons: Pokemon[] = [];
  limit = 20;

  @Output() selectedPokemon: EventEmitter<Pokemon> = new EventEmitter();
  searchKey!: string;
  @ViewChild('search')
  private searchBox!: ElementRef;


  constructor(private pokemonsService: PokemonsService) {
  }

  ngAfterViewInit(): void {
    this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).subscribe((res) => {
        this.pokemons = res.data;
        this.limit = res.limit;
      }
    );
    this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).pipe(map((v) => {
      return v.data as Pokemon[];
    }));
    fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(500)
    ).subscribe((v) => {
      if (v !== '') {
        this.pokemonsService.getPokemons({search: v}).subscribe((res) => {
          this.pokemons = res.data;
        });
      } else {
        // offset = 0 to reload basic pokemons tab.
        this.pokemonsService.getPokemons({offset: 0, limit: this.limit}).subscribe((res) => {
            this.pokemons = res.data;
            this.limit = res.limit;
          }
        );
      }
    });
  }

  onScroll(): void {
    this.pokemonsService.getPokemons({offset: this.pokemons.length, limit: this.limit}).subscribe((res) => {
      console.log(res);
      this.pokemons = [...this.pokemons.concat(res.data)];
      this.limit = res.limit;
      console.log(this.pokemons);
    });
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon.emit(pokemon);
  }

  searchFor($event: any): void {
    console.log($event);
  }
}
