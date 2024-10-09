import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../../../shared/services/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor() { }
  private jwtHelper = new JwtHelperService;
  isLoggedIn(): boolean {
    const token = tokenGetter();
     console.log(token);
    // If no token or the token is expired, return false
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.isTokenExpired(token)) 
      return false; 
    }
    return true;
  }
}


