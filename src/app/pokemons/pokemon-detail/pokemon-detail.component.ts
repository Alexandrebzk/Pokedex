import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonsService} from '../pokemons.service';
import {Pokemon} from '../../models/Pokemon';
import {Observable} from 'rxjs';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {
  pokemon$?: Observable<Pokemon>;
  @Input() selectedPokemonId?: number;
  @Input() cols!: number;
  @Input() rowHeight!: string;
  @Output() onDelete: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  @Output() onAdd: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  @Input() isRemovable = false;
  @Input() isAddable = false;
  @Input() showDescription = false;


  constructor(private route: ActivatedRoute, private pokemonsService: PokemonsService, private authService: AuthService) {
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

  emitDelete(pok: Pokemon): void {
    this.onDelete.emit(pok);
  }

  emitAdd(pok: Pokemon): void {
    this.onAdd.emit(pok);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
