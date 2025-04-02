import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthapiService } from '../shared/authapi.service';
import { AppComponent } from '../app.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private builder: FormBuilder, 
    private router: Router,
    private authapi: AuthapiService,
    private app: AppComponent
  ){}

  loggedIn = false;
  errorMessageFromBackend!: any;
  loginForm !: FormGroup;
  showErrorCard: boolean = false;



  ngOnInit(){
    this.loginForm = this.builder.group({
      login: new FormControl(''),
      password: new FormControl('')
    });
    this.loggedIn = this.authapi.isLoggedIn();
  }



  login(){
    console.log("Itt következik az azonosítás..");
    this.authapi.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);

        if(!data.token){
          this.errorMessageFromBackend = `
          <p>Az azonosítás sikertelen. Nincs érvényes token!</p>`;
          return;
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('userId', data.user.id);
        this.app.showAdminPage = (data.user.role === 'admin' || data.user.role === 'superadmin');
        this.app.loggedIn = true;
        this.loggedIn = true;

        if(data.user.role === 'admin' || data.user.role === 'superadmin') {
          this.router.navigate([{ outlets: { admin: ['adminsite']} }]);
        } else {
          this.router.navigate(['/']);
        }

        this.loginForm.reset()
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        console.log("Belépési hiba:",error),
        this.errorMessageFromBackend = ` <hr>
        <p>Hibás felhasználónév vagy jelszó</p> 
        <hr>
        `;
        this.showErrorCard = true;
      }

      /* BANCKEND VÁLASZÁT KIÍRATNI
            error: (error: HttpErrorResponse) => {
        console.log("Belépési hiba:",error),
        this.errorMessageFromBackend = ` <hr>
        <p>Hibás felhasználónév vagy jelszó</p> <hr>
        ${error.error?.message} </br>  
        `
      }
      */
    })
  }

  navigateToRegister(){
    this.router.navigate([{outlets: {top: 'register' }}]); //navigálás a regisztrációs oldalra
  }

}
