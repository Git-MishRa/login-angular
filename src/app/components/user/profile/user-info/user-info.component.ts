import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProfileService } from '../../../../services/user/profile-service/profile-service.service';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../../../models/UserInfo';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtServiceService } from '../../../../shared/services/jwt.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  userProfileForm: FormGroup;
  userFirstName: FormControl;
  userLastName: FormControl;
  userEmail: FormControl;
  storeID!: number;
  isEditing: boolean = false;  // Tracks the edit mode
  constructor(
    private profileService: ProfileService,
    private jwtId: JwtServiceService
  ) {
    this.userFirstName = new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]);
    this.userLastName = new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.maxLength(35),
      Validators.pattern(/^[a-zA-Z]+$/),
    ]);
    this.userEmail = new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.maxLength(254),
      Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.(?:com|in)$/),
    ]);
    this.userProfileForm = new FormGroup({
      firstName: this.userFirstName,
      lastName: this.userLastName,
      email: this.userEmail,
    });
  }

  ngOnInit() {
    this.userProfileForm.statusChanges.subscribe(status => {
      this.toggleCancelButton();
    });

    var uId = this.jwtId.getUserIdAsNumber();

    if (uId === null) {
      console.log('ID not found');
    } else {
      this.fetchUserProfile(uId);
      this.storeID = uId;
    }

    console.log(typeof uId);
    console.log(uId);
  }

  fetchUserProfile(userId: number) {
    this.profileService.getUserProfile(userId).subscribe(
      (userProfile: UserInfo) => {
        this.userFirstName.setValue(userProfile.firstName);
        this.userLastName.setValue(userProfile.lastName);
        this.userEmail.setValue(userProfile.email);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.error('User not found:', error.error); // Log specific user not found message
        } else {
          console.error('Error fetching user profile:', error);
        }
      }
    );
  }

  editDetails() {
    this.userProfileForm.enable();
    this.isEditing = true;  // Set edit mode to true
  }

  saveChanges() {
    if (this.userProfileForm.valid) {
      const userId = this.storeID;
      const updatedProfile: UserInfo = {
        firstName: this.userFirstName.value,
        lastName: this.userLastName.value,
        email: this.userEmail.value,
      };
      this.profileService.editUserProfile(userId, updatedProfile).subscribe(
        () => {
          console.log('User profile updated successfully!');
          this.userProfileForm.disable();
          this.isEditing = false;  // Set edit mode to false

        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    } else {
      this.userProfileForm.markAllAsTouched();
    }
  }


  // Method to toggle the Cancel button based on form validity
  toggleCancelButton() {
    if (this.userProfileForm.valid) {
      this.enableCancelButton();
    } else {
      this.disableCancelButton();
    }
  }

  // Helper methods to enable/disable the cancel button
  enableCancelButton() {
    const cancelButton = document.querySelector('#cancelButton');
    if (cancelButton) {
      (cancelButton as HTMLButtonElement).disabled = false;
    }
  }

  disableCancelButton() {
    const cancelButton = document.querySelector('#cancelButton');
    if (cancelButton) {
      (cancelButton as HTMLButtonElement).disabled = true;
    }
  }
  // Method to handle the cancel button functionality
  cancelEdit(): void {
    this.userProfileForm.disable(); // Disable the form without reverting values
    this.isEditing = false;  // Set edit mode to false
  }




}
