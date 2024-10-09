import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/user/auth-service/login.service';
import { inject } from '@angular/core';

import { UserauthService } from '../../services/user/auth-service/userauth.service';


export const userauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserauthService);
  const router = inject(Router);

  // If the user is not logged in, or the token is expired, redirect to the login page
  if (!authService.isLoggedIn()) {
    //authService.logout(); // Optional: Ensure token removal in case of expiration
    router.navigate(['/']);
    return false;
  }

  return true; // Allow access to the route
};
