import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AuthapiService } from '../shared/authapi.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(
    private app: AppComponent,
    private router: Router,
    private authapi: AuthapiService
  ){}

  ngOnInit(){
    console.log("kijelentkezés")
    this.router.navigate([{outlets: {top: ['login']}}]);
  }

  ngOnDestroy(){
    this.app.loggedIn = false;
    this.authapi.logout().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('showAdminPage');
    localStorage.removeItem('showProductDetail');
    this.router.navigate(['/']);
  }
}