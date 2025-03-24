import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserprofileService } from '../shared/userprofile.service';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private userProfile: UserprofileService
  ){}

  changePasswordForm !: FormGroup
  successfullChangePassword = false;
  textFromBackend!: string;

  ngOnInit(){
    this.changePasswordForm = this.builder.group({
      current_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      new_password_confirmation: new FormControl('', [Validators.required])
    })
  }

  changePassword(){
    this.userProfile.changePassword(this.changePasswordForm.value).subscribe({
      next: (response) => {
        console.log('a szerver válasza: ', response)
        this.changePasswordForm.reset()
        this.successfullChangePassword = true;
        this.textFromBackend = response.message;
      },
      error: (error) => {
        console.log('Hiba történt: ', error)
      }
    })
  }


  navigateToProfile(){
    this.router.navigate([{outlets: {top: 'profil' }}]);
  }
}