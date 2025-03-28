import { Component } from '@angular/core';
import { AuthapiService } from '../shared/authapi.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserprofileService } from '../shared/userprofile.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  userName: string = '';
  userDataForm!: FormGroup;
  showProfile = true;
  successfullProfilDataChanged: boolean = false;

  constructor(
    private authapi: AuthapiService,
    private builder: FormBuilder,
    private userProfileService: UserprofileService,
    private router: Router
  ){}

  ngOnInit(){
    this.userName = this.authapi.getUserName();
    this.userDataForm = this.builder.group({
      name: [''],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      birth_date: [null, [Validators.required, Validators.min(new Date('1900-01-01').getTime()), Validators.max(new Date('2025-12-31').getTime())]],
      phone_number: [''/*, [Validators.pattern(/^\+?\d{7,15}$/)]*/],
      postal_code: ['', [Validators.pattern(/^\d{4,5}$/)]],
      city: ['', Validators.required],
      street: ['', Validators.required],
      house_number: ['', [Validators.required, Validators.pattern(/^\d+[a-zA-Z]?$/)]],
      floor: [''],
      door: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    })
    console.log("buildem: ", this.userDataForm)
    this.loadUserData()
  }

  loadUserData(){
    this.userProfileService.getUserData().subscribe(
      (response) => {
        console.log('Betöltött user adatok:', response);
        this.userDataForm.patchValue(response);
        console.log('Form értékei:', this.userDataForm.value);
        
      },
      (error) => {
        console.error('Hiba történt az adatok betöltésekor:', error);
      }
    );
  }

  saveData(){
    this.userProfileService.updateUserData(this.userDataForm.value).subscribe(
      (response) => {
        console.log('Sikeres mentés: ', response);
        this.successfullProfilDataChanged = true;
      },
      (error) => {
        console.error('Hiba történt mentés közben: ', error);
      }
    );
    this.loadUserData()
  }

    toggleProfile(show: boolean) {
      this.showProfile = show;
    }

    navigateToChangePassword(){
      this.router.navigate([{outlets: {top: 'changepassword' }}]);
    }



}
