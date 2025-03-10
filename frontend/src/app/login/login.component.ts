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
      login: new FormControl(''),
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('role', data.user.role);
        this.app.showAdminPage = (data.user.role === 'admin' || data.user.role === 'superadmin');
        this.app.loggedIn = true;
        this.loggedIn = true;

        if(data.user.role === 'admin' || data.user.role === 'superadmin') {
          this.router.navigate([{ outlets: { admin: ['adminsite']} }]);
        } else {
          this.router.navigate(['/']);
        }

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
