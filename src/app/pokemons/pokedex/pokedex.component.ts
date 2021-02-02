import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Pokemon} from '../../models/Pokemon';
import {PokemonDetailComponent} from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer')
  private drawer: any;
  @ViewChild(PokemonDetailComponent)
  private pokemonDetailComponent!: PokemonDetailComponent;
  selectedId!: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelectedPokemon($event: any): void {
    this.selectedId = $event.id;
  }

  ngAfterViewInit(): void {
    /*
    Just for styling effect
    * */
    setTimeout(() => this.drawer.toggle(), 300);
  }
}
