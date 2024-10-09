import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private apiUrl = 'http://localhost:5001/auth';  // Your API Endpoin
  private jwtHelper = new JwtHelperService();
  constructor(private http : HttpClient, private router: Router) {
   }

  login(creadentials: {email: string , password: string}): Observable<any>{
    
    return this.http.post(`${this.apiUrl}/login`, creadentials)
  }
  register(creadentials: {name : string, email: string , password: string}): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, creadentials).pipe(tap((response: any) => {
      if(response.token)
      localStorage.setItem('token', response.token);
    }));
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  
  isLoggedIn(){
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUserRole(){
    const token = localStorage.getItem('token');
    if(!token){
      return null;
    }
    return this.jwtHelper.decodeToken(token).role;
  }
  getUserId(){
    const token = localStorage.getItem('token');
    if(!token){
      return null;
    }
    return this.jwtHelper.decodeToken(token).Id;
  }

}
