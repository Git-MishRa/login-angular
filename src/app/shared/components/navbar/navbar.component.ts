import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { UserauthService } from '../../../services/user/auth-service/userauth.service';
import { LoginService } from '../../../services/user/auth-service/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn : boolean = false;

  ngOnInit(): void {
    this.isLoggedIn  =this.userAuth.isLoggedIn();
    console.log(this.isLoggedIn);
  }

  constructor(private router: Router, private userAuth : UserauthService , private loginService : LoginService) { }
  
  goToProfile() {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    } else {
      // Handle login/registration 
      console.log('User needs to log in or register!');
    }
  }

  logout() {
    this.loginService.logout().subscribe(
      success => {
        if (success) {
          this.isLoggedIn = false;
          localStorage.removeItem('jwtToken'); 
          this.router.navigate(['/']);
          console.log('User logged out!');
        } else {
          console.log('Logout Failed');
        }
      },
      error => {
        console.log('An error occurred during logout:', error);
      }
    );
  }


}
