import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from '../../services/user/auth-service/login.service';
import { login, loginSuccess, loginFailure } from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) {}
  
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.loginService.login({username: action.username,password: action.password}).pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======

  
>>>>>>> Stashed changes
=======

  
>>>>>>> Stashed changes
}