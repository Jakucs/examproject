import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthapiService } from '../shared/authapi.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
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



  ngOnInit(){
    this.loginForm = this.builder.group({
      name: new FormControl(''),
      password: new FormControl('')
    });
    this.loggedIn = this.authapi.isLoggedIn();
  }

  loginForm !: FormGroup;

  login(){
    console.log("Itt következik az azonosítás..");
    this.authapi.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
        localStorage.setItem('token', data.data.token)
        this.app.loggedIn = true;
        this.loggedIn = true;
        this.loginForm.reset()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  navigateToRegister(){
    this.router.navigate([{outlets: {top: 'register' }}]); //navigálás a regisztrációs oldalra
  }

}
