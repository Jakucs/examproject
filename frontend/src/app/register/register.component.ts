import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthapiService } from '../shared/authapi.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessageFromBackend!: any;

  constructor(
    private builder: FormBuilder,
    private authapi: AuthapiService,
    private router: Router // <--- Ez kell ahhoz, hogy navigálni tudjak komponensekre
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

/*     document.addEventListener("DOMContentLoaded", function () {
      let navMenu = document.getElementById("navMenu");
      let registerForm = document.getElementById("registerForm"); // Regisztrációs form azonosítója
  
      navMenu!.addEventListener("shown.bs.collapse", function () {
          registerForm!.style.marginTop = "470px"; // Beállítod a szükséges margót
      });
  
      navMenu!.addEventListener("hidden.bs.collapse", function () {
          registerForm!.style.marginTop = "0"; // Visszaállítod az eredeti állapotba
      });
  }); //<----INNEN FOLYTASSAM */

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

        this.errorMessageFromBackend = `
        <p>Valós email cím feltétel!</p> <hr> 
        <p>Jelszó minimum 8 karakter! Kisbetűt és számot is tartalmazzon!</p> <hr> 
        ${error.error?.message} </br>  
        `
      }
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