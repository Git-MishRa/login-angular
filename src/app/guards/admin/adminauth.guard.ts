import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterState, RouterStateSnapshot } from '@angular/router';
import {AdminAuthService} from '../../services/admin/adminauth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AdminauthGuard implements CanActivate {
  constructor(private authService: AdminAuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot): boolean {
    if(this.authService.isLoggedIn()){
      if(this.authService.getUserRole() === route.data['expectedRole']){
        return true;
      }
      this.router.navigate(['admin/unauthorised']);
      return false;
    }
    this.router.navigate(['admin/unauthorised']);
    return false;
  }
}

