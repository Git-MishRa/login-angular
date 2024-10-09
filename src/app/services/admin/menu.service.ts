import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:5001/menu';  // Your API Endpoint
  private httpHeaders: HttpHeaders;
  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*',).set('Access-Control-Allow-Methods','*');
  }

  // Get all menu items
  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl, { headers: this.httpHeaders.set("Authorization","Bearer " + localStorage.getItem('token')) });
  }

  // Create a new menu item
  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu, { headers: this.httpHeaders.set("Authorization","Bearer " + localStorage.getItem('token'))  });
  }

  getMenuById(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`, { headers: this.httpHeaders.set("Authorization","Bearer " + localStorage.getItem('token'))  });
  }

  // Update an existing menu item
  updateMenu(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, menu, { headers: this.httpHeaders.set("Authorization","Bearer " + localStorage.getItem('token')) });
  }

  // Delete a menu item
  deleteMenu(id: number): Observable<any> {
    return this.http.delete<Menu>(`${this.apiUrl}/${id}`, { headers: this.httpHeaders.set("Authorization","Bearer " + localStorage.getItem('token')) });
  }
  getActiveMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/active`, { headers: this.httpHeaders.set("Authorization","Bearer " + localStorage.getItem('token'))  });
  }
}
