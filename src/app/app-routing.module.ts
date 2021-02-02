import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PokemonListComponent} from './pokemons/pokemon-list/pokemon-list.component';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuard} from './authentication.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pokedex'},
  {path: 'pokedex', pathMatch: 'full', component: PokedexComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'pokemons', pathMatch: 'full', component: PokemonListComponent, canActivate: [AuthenticationGuard]},
  {path: 'pokemons/detail/:id', pathMatch: 'full', component: PokemonDetailComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
