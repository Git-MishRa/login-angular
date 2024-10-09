import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService} from '../../../services/user/auth-service/register.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(private registrationService: RegistrationService, private router: Router) {
    // Initialize form controls with validators
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);

    // Set up the registration form group
    this.registrationForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.registrationService.register(this.registrationForm.value).subscribe(
        response => {
          console.log('Registration Successful!', response);
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          console.error('Registration failed: ', error);
        }
      );
    }
  }
}
