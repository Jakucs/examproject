import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthapiService } from './shared/authapi.service';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ProductsComponent, AboutusComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vizsgamunka';
  loggedIn = false;
  showAdminPage: boolean = false; //adminoldal alapértelmezett állása
  selectedLang = 'HU'; //nyelvválasztó dropdown menü alapértelmezett állása
  userName: string = ''; //bejelentkezett felhasználó neve alapból ''

  constructor(private authapi: AuthapiService){}

  ngOnInit(){
    this.loggedIn = this.authapi.isLoggedIn();
    this.userName = this.authapi.getUserName();
    const role = localStorage.getItem('role')
    this.showAdminPage = ( role === 'admin' || role === 'superadmin');
  }

  changeWord(lang: string){
    this.selectedLang = lang;
  }
}
