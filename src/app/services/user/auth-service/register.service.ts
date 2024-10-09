import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'https://userservice-team10-dnfsech0gddvdadp.westeurope-01.azurewebsites.net/auth'; // Replace with actual registration URL
  constructor(private http: HttpClient) {}

  // Updated method to handle registration instead of login
  register(user: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      map(response => {
        // Assuming the registration response contains a token (optional)
        const token = response.token;
        console.log('Registration successful. Token:', token);
        // Optionally, store the token
        if (token) {
          localStorage.setItem('jwtToken', token);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle error logic
    console.error('Registration error occurred:', error.message);
    return throwError('An error occurred during registration.');
  }
}
