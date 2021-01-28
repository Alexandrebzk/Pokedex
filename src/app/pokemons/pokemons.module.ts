import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { IdPipe } from './id.pipe';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, IdPipe],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatGridListModule,
    MatChipsModule,
    DragDropModule,
    MatButtonModule
  ],
  exports: [PokemonListComponent]
})
export class PokemonsModule { }
