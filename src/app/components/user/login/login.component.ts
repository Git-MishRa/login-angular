import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { LoginService } from '../../../services/user/auth-service/login.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  errorMessage: string | null = null; // Property to hold the error message

  constructor(private loginService: LoginService, private router : Router) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value ).subscribe(
        response => {
          this.router.navigate(['/']);
        })
    } else {
      console.log('Form is invalid');
    }
  }
}
