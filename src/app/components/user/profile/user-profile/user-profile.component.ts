import { Component } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ProfileService } from '../../../../services/user/profile-service/profile-service.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtServiceService } from '../../../../shared/services/jwt.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    UserInfoComponent,
    ChangePasswordComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  activeOption: string = 'profile';
  showDeleteConfirmation: boolean = false;
  confirmationMessage: string = '';
  errorMessage: string = '';
  hideAlert: boolean = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private jwtService: JwtServiceService) { }

  selectOption(option: string) {
    this.activeOption = option;
  }

  openDeleteConfirmationModal() {
    this.showDeleteConfirmation = true;
    document.body.classList.add('modal-open'); // Add class to body
  }

  closeDeleteConfirmationModal() {
    this.showDeleteConfirmation = false;
    document.body.classList.remove('modal-open'); // Remove class from body
  }

  confirmDelete() {  ////-------------------------------------------------------
    const userId = this.jwtService.getUserIdAsNumber();
    console.log('Success to delete account');
    if (userId !== null) {
      this.profileService.deleteAccount(userId).subscribe({

        next: (response) => {
          if (response.status === 204) {
            this.showSuccessMessage('Account deleted successfully');
            setTimeout(() => {
              this.logout();
            }, 3000);
          } else {
            this.showErrorMessage('Failed to delete account');
          }
        },
        error: (error) => {
          console.error('Failed to delete account', error);
          this.showErrorMessage('Failed to delete account');
        }
      });
    } else {
      this.showErrorMessage('User ID not found.');
    }

    this.closeDeleteConfirmationModal();
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/']);
    console.log("User logged out!")
  }

  // Show success message with auto-dismiss animation
  showSuccessMessage(message: string) {
    this.confirmationMessage = message;
    this.hideAlert = false; // Show the alert

    setTimeout(() => {
      this.hideAlert = true; // Trigger fade-out after 3 seconds
    }, 3000);

    setTimeout(() => {
      this.confirmationMessage = ''; // Clear the message after fade-out
    }, 3500);
  }

  // Show error message with auto-dismiss animation
  showErrorMessage(message: string) {
    this.errorMessage = message;
    this.hideAlert = false; // Show the alert

    setTimeout(() => {
      this.hideAlert = true; // Trigger fade-out after 3 seconds
    }, 3000);

    setTimeout(() => {
      this.errorMessage = ''; // Clear the message after fade-out
    }, 3500);
  }
}
