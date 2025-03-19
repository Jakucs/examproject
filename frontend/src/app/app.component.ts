import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthapiService } from './shared/authapi.service';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { CartapiService } from './shared/cartapi.service';
import { HeaderComponent } from "./header/header.component";
import { ProfilComponent } from './profil/profil.component';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ProductsComponent, AboutusComponent, FooterComponent, HeaderComponent, ProfilComponent, OrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vizsgamunka';
  loggedIn = false;
  showAdminPage: boolean = false; //adminoldal alapértelmezett állása
  showProfile = false; //profilom menüpont alapértelmezett állása
  selectedLang = 'HU'; //nyelvválasztó dropdown menü alapértelmezett állása
  userName: string = ''; //bejelentkezett felhasználó neve alapból ''
  cartItemCount: number = 0; //User kosara alapból 0

  constructor(
    private authapi: AuthapiService,
    private cartService: CartapiService
  ){}

  toggleProfile(show: boolean) {
    this.showProfile = show;
  }

  ngOnInit(){
    this.loggedIn = this.authapi.isLoggedIn();
    this.userName = this.authapi.getUserName();
    const role = localStorage.getItem('role')
    this.showAdminPage = ( role === 'admin' || role === 'superadmin');
    this.getCartItemCount();
    this.cartService.fetchCartItemCount();
  }

  changeWord(lang: string){
    this.selectedLang = lang;
  }

  getUserIdFromLocalStorage() {

  }


  getCartItemCount(){
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count; // Automatikus frissítés
    });
  }


//ITT MAJDNEEEEEEEEEEEEEEEEEEEEEM ADATBÁZISBÓL KIVAN OLVASVA A KOSÁR ÉRTÉK
// MÁR CSAK AZ ADATOT KÉNE VALAHOGY ÁTALAKÍTANI................

/*getCartItemCount() {
  this.cartService.getCartItemCount().subscribe(
    (response) => {
      this.cartItemCount = Number(response.count);
    },
    (error) => {
      console.log("Kosárértéket nemlehet kiolvasni", error);
    }
  );
} */


/*  getCartItemCount() {
    return this.cartService.getCartItemCount();
  }
  //USER ID-T A LOCALSTORAGE-BA TÁROLJUK JELENLEG! LOGINBA MENTJÜK ODA!
*/
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
