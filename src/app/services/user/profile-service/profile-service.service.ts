import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UserInfo } from '../../../models/UserInfo';
import { tokenGetter } from '../../../shared/services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://userservice-team10-dnfsech0gddvdadp.westeurope-01.azurewebsites.net/users/userprofile';

  token = tokenGetter();
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) { }

  changePassword(
    oldPassword: string,
    newPassword: string,
    id: number
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/changepassword/${id}`,
      { oldPassword, newPassword },
      { headers: this.headers }
    );
  }

  deleteAccount(userId: number): Observable<HttpResponse<any>> {  //--------------
    return this.http.delete(`${this.apiUrl}/delete/${userId}`, { headers: this.headers, observe: 'response' });
  }

  getUserProfile(id: number): Observable<UserInfo> {
    return this.http
      .get<UserInfo>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError) // Error handling
      );
  }

  editUserProfile(id: number, updatedProfile: UserInfo): Observable<UserInfo> {
    return this.http
      .put<UserInfo>(`${this.apiUrl}/editprofile/${id}`, updatedProfile, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () =>
        new Error(
          error.message || 'Something went wrong; please try again later.'
        )
    );
  }
}
