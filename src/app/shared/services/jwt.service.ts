import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtServiceService {
  constructor() { }

  getToken(): string | null {
     //localStorage.setItem(
     //  'jwtToken',
     //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsIm5iZiI6MTcyODA3MTIzMywiZXhwIjoxNzI4MDc0ODMzLCJpYXQiOjE3MjgwNzEyMzN9.fbb2nXJV9LPAOOekDrp8vO2bzppHTw1a8DVcur-an8c'
     //);
    return localStorage.getItem('jwtToken');
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);

        return decodedToken.nameid || null;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getUserIdAsNumber(): number | null {
    const useridjwt = this.getUserIdFromToken();
    let uId: number | null = null;

    if (useridjwt !== null) {
      uId = parseInt(useridjwt, 10);
    }
    return uId;
  }
}

export function tokenGetter() {
  return localStorage.getItem('jwtToken'); 
}