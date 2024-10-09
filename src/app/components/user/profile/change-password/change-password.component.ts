import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProfileService } from '../../../../services/user/profile-service/profile-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtServiceService } from '../../../../shared/services/jwt.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private jwtService: JwtServiceService 
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword !== confirmPassword ? { mismatch: true } : null;
  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (hasMinLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar)
      ? null
      : { strongPassword: true };
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.value;

      const userId = this.jwtService.getUserIdAsNumber();

      if (userId !== null) {
        this.profileService.changePassword(oldPassword, newPassword, userId)
          .subscribe(
            (response: any) => {
              this.successMessage = 'Password changed successfully';
              setTimeout(() => {
                this.successMessage = null;
              }, 2000);
            },
            (error: any) => {
              console.log('Full error response:', error);
              if (error.status === 400 && error.error?.error) {
                this.errorMessage = error.error.error;
              } else {
                this.errorMessage = 'An error occurred. Please try again.';
              }
            }
          );
      } else {
        this.errorMessage = 'User ID not found.';
      }
    }
  }
}
