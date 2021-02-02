import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });
  error = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  submit(): void {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).pipe(
        catchError(err => {
          this.error = err.error.error + ' : ' + err.error.message;
          return throwError(err);
        })
      ).subscribe(() => {
        this.error = '';
        this.router.navigate(['pokedex']);
      });
    }
  }

  ngOnInit(): void {
  }

}
