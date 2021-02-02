import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonsService} from '../pokemons.service';
import {Pokemon} from '../../models/Pokemon';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  pokemon$?: Observable<Pokemon>;
  @Input()
  selectedPokemonId!: number;


  constructor(private route: ActivatedRoute, private pokemonsService: PokemonsService) {
  }

  ngOnInit(): void {
    const idPokemon = this.route.snapshot.paramMap.get('id');
    if (idPokemon !== null) {
      this.pokemon$ = this.pokemonsService.getSpecialPokemon(idPokemon);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedPokemonId.previousValue !== changes.selectedPokemonId.currentValue
      && changes.selectedPokemonId.currentValue !== undefined) {
      this.pokemon$ = this.pokemonsService.getSpecialPokemon(changes.selectedPokemonId.currentValue);
    }
  }
}
