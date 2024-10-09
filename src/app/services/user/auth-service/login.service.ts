import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { tokenGetter } from '../../../shared/services/jwt.service';
import { Store } from '@ngrx/store';
import { login, logout } from '../../../shared/AuthState/auth.actions';
import { AuthState } from '../../../shared/AuthState/auth.reducer';
import { StoreModule } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://userservice-team10-dnfsech0gddvdadp.westeurope-01.azurewebsites.net/auth'; // Replace with actual login URL

  token = tokenGetter();
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });
  constructor(private http: HttpClient, private store: Store<{ auth: AuthState }>) { }

  login(credentials: {username: string, password: string} ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        if(response.success){
          this.store.dispatch(login(credentials));
          const token = response.token;
          console.log(token);
        localStorage.setItem('jwtToken', token);
        return token;
        }
        else{
          throw new Error('Login Failed');
        }
        // const token = response.token;
        // console.log(token);
        // localStorage.setItem('jwtToken', token);
        // return token;
      }),
      catchError(this.handleError)
    );
  }


  logout(): Observable<boolean> {
    const token = tokenGetter(); 
    if (!token) {
      return throwError(() => new Error('No token found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<any>(`${this.apiUrl}/logout`, { headers }).pipe(
      map(response => {
        if (response.message === 'Successfully logged out.') {
          localStorage.removeItem('jwtToken');
          this.store.dispatch(logout()); 
          return true;
        } else {
          return false;
        }
      }),
      catchError(this.handleError)
    );
  }



  private handleError(error: any) {
    console.error('An error occurred:', error);

    return throwError(() =>
      new Error(
        error.message || 'Something went wrong; please try again later.'
      )
    );
  }

}
