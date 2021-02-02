import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResponseAuth} from '../models/ResponseAuth';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURI = environment.pokedexApiUrl + '/auth';
  // tslint:disable-next-line:variable-name
  private _authenticationResponse?: ResponseAuth;

  constructor(private http: HttpClient) {
  }
  get authenticationResponse(): ResponseAuth | undefined {
    return this._authenticationResponse;
  }

  login(email: string, password: string): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(this.apiURI + '/login', {email, password}).pipe(tap((res) => {
      this._authenticationResponse = res;
    }));
  }

  // tslint:disable-next-line:variable-name
  refreshToken(refresh_token: string): Observable<ResponseAuth> {
    return this.http.post<ResponseAuth>(this.apiURI + '/refresh', {refresh_token});
  }
}
