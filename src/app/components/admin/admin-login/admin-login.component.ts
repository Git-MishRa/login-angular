import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../../services/admin/adminauth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if(this.adminAuthService.isLoggedIn()) this.router.navigate(['admin/menu']);
  }

  
  isSubmitting = false;

  credentials: { email: string; password: string } = { email: '', password: '' };

  errorMessage: string = '';
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.adminAuthService.login(this.credentials).subscribe({
        next: (response) =>
        { 
          if(response.token)
          {
            console.log(response);
            localStorage.setItem('token', response.token);
          }
          this.router.navigate(['admin/menu'])
          
        },
        error: (err) => {
          console.log(err); 
          console.log(err.status);
          if(err.status === 401){
            this.errorMessage = 'Invalid email or password';
          }
          if(err.status === 500){
            this.errorMessage = 'Internal server error';
          }
        } 
      });
    } 
    else {
      this.errorMessage = 'Please fill out the form correctly';
    }
  }
}
