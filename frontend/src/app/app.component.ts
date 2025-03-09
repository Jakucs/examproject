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
  showAdminPage=true; //adminoldal alapértelmezett állása
  selectedLang = 'HU'; // nyelvválasztó dropdown menü alapértelmezett állása

  constructor(private authapi: AuthapiService){}

  ngOnInit(){
    this.loggedIn = this.authapi.isLoggedIn()
  }

  changeWord(lang: string){
    this.selectedLang = lang;
  }
}
