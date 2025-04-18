import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthapiService } from '../shared/authapi.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessageFromBackend!: any;
  showErrorCard: boolean = false;

  constructor(
    private builder: FormBuilder,
    private authapi: AuthapiService,
    private router: Router
  ) {}

  /* 
    A következő kódsorokat az alábbi módon is meglehetne oldani:
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password_confirmation: new FormControl('')
});
  */

  
  ngOnInit(){
    this.registerForm = this.builder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      password_confirmation: ['']
    })



  }

  register(){
    console.log(this.registerForm.value)
    this.authapi.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        if (response.success){
          console.log("Sikerült a regisztráció! " + response.message)
          this.router.navigate([{outlets: {top: ['successfulregister']}}]);
        }else{
          console.log('Nem sikerült a regisztráció', response)
          this.errorMessageFromBackend = response.message;
          }
      },
      error: (error: HttpErrorResponse) => {
        console.log('Regisztrációs hiba:', error);
        this.showErrorCard = true;
        this.errorMessageFromBackend = `<hr>
        <p>Valós email cím feltétel!</p> <hr> 
        <p>Jelszó minimum 8 karakter! Kisbetűt és számot is tartalmazzon!</p> <hr>
        `
      }

      /* JÓ BACKEND ÜZENET
            error: (error: HttpErrorResponse) => {
        console.log('Regisztrációs hiba:', error);
        this.showErrorCard = true;
        this.errorMessageFromBackend = `
        <p>Valós email cím feltétel!</p> <hr> 
        <p>Jelszó minimum 8 karakter! Kisbetűt és számot is tartalmazzon!</p> <hr> 
        ${error.error?.message} </br>  
        `
      }
      */
    })
  }

  navigateToLogin(){
    this.router.navigate([{outlets: {top: ['login']}}]);
  }



}



/**
 * 
 * 
 * 
 *           this.errorMessageFromBackend = ` <br>
           <p> ${response.message} </p> <br>
           <p> ${response.error.name} </p> <br>
           <p> ${response.error.password} </p> <br>
           <p> ${response.error.email} </p> <br>
           <p> ${response.error.email[0]} </p>
        `
 */