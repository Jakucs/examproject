import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthapiService } from './shared/authapi.service';
import { ProductsComponent } from './products/products.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { CartapiService } from './shared/cartapi.service';
import { HeaderComponent } from "./header/header.component";
import { ProfilComponent } from './profil/profil.component';
import { OrderComponent } from './order/order.component';
import { ProductSearchService } from './shared/product-search.service';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    ProductsComponent, 
    AboutusComponent, 
    FooterComponent, 
    HeaderComponent, 
    ProfilComponent, 
    ProductDetailComponent,
    OrderComponent, 
    FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vizsgamunka';
  loggedIn = false;
  showAdminPage: boolean = false; //adminoldal alapértelmezett állása
  showProductDetail: boolean = false;
  showProfile = false; //profilom menüpont alapértelmezett állása
  selectedLang = 'HU'; //nyelvválasztó dropdown menü alapértelmezett állása
  userName: string = ''; //bejelentkezett felhasználó neve alapból ''
  cartItemCount: number = 0; //User kosara alapból 0
  searchText: string = ''; // keresőstring alapból ''
  loginComponentShow: boolean = false;

  constructor(
    private authapi: AuthapiService,
    private cartService: CartapiService,
    private productSearchService: ProductSearchService,
    private router: Router
  ){}

  showLoginComponent(show: boolean){
    this.loginComponentShow = show
  }

  toggleProfile(show: boolean) {
    this.showProfile = show;
  }

  ngOnInit(){
    this.loggedIn = this.authapi.isLoggedIn();
    this.userName = this.authapi.getUserName();
    const role = localStorage.getItem('role');
    const showAdminPage = localStorage.getItem('showAdminPage') === 'true';
    this.showAdminPage = showAdminPage && (role === 'admin' || role === 'superadmin');
    if(this.showAdminPage){
      this.router.navigate([{outlets: { admin: ['adminsite']}}]);
    }
    this.getCartItemCount();
    this.cartService.fetchCartItemCount();
  }

  changeWord(lang: string){
    this.selectedLang = lang;
  }

  onSearchChange(){
    this.productSearchService.updateSearchQuery(this.searchText)
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

  scrollToProducts() {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
