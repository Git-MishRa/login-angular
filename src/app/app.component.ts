import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  standalone: false,
  selector: 'app-root',
  template: `<h1>Login Page</h1><app-login></app-login>`,
})
export class AppComponent {}
