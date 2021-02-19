import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {TeamService} from './team.service';
import {Pokemon} from '../models/Pokemon';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @ViewChild('drawer')
  private drawer: any;
  team!: Observable<Pokemon[]>;
  pokemonsToDelete: Pokemon[] = [];

  constructor(private authService: AuthService, private teamService: TeamService, private router: Router) {
  }

  ngOnInit(): void {
    this.teamService.getTrainerTeam(this.authService.accessToken).subscribe((ids) => {
      this.team = this.teamService.retrieveTeam();
    });
  }

  submitDelete(vueTeam: any[]): void {
    vueTeam = this.teamService.team.filter((pok) => this.pokemonsToDelete.find(p => p.id === pok) === undefined);
    this.teamService.team = vueTeam;
    this.teamService.setTrainerTeam(this.authService.accessToken).subscribe();
    this.pokemonsToDelete = [];
    this.drawer.toggle();
    this.team = this.teamService.retrieveTeam();
  }

  placeToDelete(pok: any): void {
    if (this.pokemonsToDelete.length === 0) {
      this.drawer.toggle();
    }
    if (!this.pokemonsToDelete.find(p => p === pok)) {
      this.pokemonsToDelete.push(pok as Pokemon);
    }
  }

  checkToggle(): void {
    if (this.pokemonsToDelete.length === 0) {
      this.drawer.toggle();
    }
  }

  isTeamEmpty(): boolean {
    return this.teamService.team.length > 0;
  }
}
