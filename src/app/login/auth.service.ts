import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResponseAuth} from '../models/ResponseAuth';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TeamService} from '../team/team.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = environment.pokedexApiUrl + '/auth';
  // tslint:disable-next-line:variable-name
  private _authenticationResponse?: ResponseAuth;

  constructor(private http: HttpClient, private teamService: TeamService) {
  }

  get authenticationResponse(): ResponseAuth | undefined {
    return this._authenticationResponse;
  }

  get accessToken(): string | undefined {
    return this._authenticationResponse?.access_token;
  }

  login(email: string, password: string): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(this.apiURI + '/login', {email, password}).pipe(tap((res) => {
      this._authenticationResponse = res;
      this.teamService.getTrainerTeam(this.accessToken).subscribe(data => {
        this.teamService.team = data;
      });
    }));
  }

  // tslint:disable-next-line:variable-name
  refreshToken(refresh_token: string): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(this.apiURI + '/refresh', {refresh_token});
  }

  isLoggedIn(): boolean {
    return this.authenticationResponse?.access_token !== undefined && this.authenticationResponse.access_token.length > 0;
  }

  logout(): void {
    this._authenticationResponse = undefined;
  }
}
