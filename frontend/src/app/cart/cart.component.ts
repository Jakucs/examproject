import { Component } from '@angular/core';
import { AuthapiService } from '../shared/authapi.service';
import { AppComponent } from '../app.component';
import { CartapiService } from '../shared/cartapi.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AppComponent, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  userName: string = '';
  cartItems: any[] = [];
  overAmount: number = 0;

  constructor(
    private authapi: AuthapiService, 
    private cartService: CartapiService,
    private router: Router
  ){}

  ngOnInit(){
    this.userName = this.authapi.getUserName();
    this.getCart()
    /*for(let i of this.cartItems){
      console.log("A kosár tartalma:" + i);
    }*/
      console.log("cartItems értéke:", this.cartItems);
      console.log("Típus:", typeof this.cartItems);
      console.log("Array ellenőrzés:", Array.isArray(this.cartItems));
      
  }

  getCart() {
    this.cartService.getCartItems().subscribe({
      next: (data: any) => {
        console.log("getcart eredménye: ",data)
        const cartContect = data["Kosár tartalma"];
        this.cartItems = []
        for(let i = 0; i< cartContect.length; i++){
          const cart_items_id = cartContect[i].id;
          const termek = cartContect[i].product;
          const productHasQuantity = cartContect[i].quantity;
          this.cartItems.push({
            ...termek,
            quantity: productHasQuantity,
            id: cart_items_id
          });
        }
        console.log("Frissített cartItems:", this.cartItems);
        this.overAmount = data["Fizetendő összeg"];
          // AZ ELŐZŐ FOR BA A KOSÁR TARTALMA PRODUCT ELEMÉT NYERTÜK KI
        //AMI NEM TARTALMAZZA A QUANTITYT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      },
      error: (error) => {
        console.error('Hiba történt a kosár betöltésekor: ', error);
      }
    })
  }

  removeFromCart(id: number){
    console.log("Törlés...")
    this.cartService.destroyCartItem(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getCart();
      }
    })
    this.cartService.fetchCartItemCount()
  }

  removeAllCart(){
    this.cartService.destroyAllCart().subscribe({
      next: (data: any) => {
        console.log(data)
        this.getCart();
      }
    })
    this.cartService.fetchCartItemCount()
  }

  decrease(cartItem: any){
    if(cartItem.quantity>1){
      cartItem.quantity--;
    }
    this.cartService.modifyCartItemQuantity(cartItem.id, cartItem.quantity).subscribe({
      next: (data: any) => {
        console.log("Kosár mennyisége frissítve:", data);
      },
      error: (error) => {
        console.error("Hiba történt a kosár termék mennyiségének frissítése során:", error);
      }
    })
    this.cartService.fetchCartItemCount()
  }

  increase(cartItem: any) {
    cartItem.quantity++;
    this.cartService.modifyCartItemQuantity(cartItem.id, cartItem.quantity).subscribe({
      next: (data: any) => {
        console.log("Kosár mennyisége frissítve:", data);
      },
      error: (error) => {
        console.error("Hiba történt a kosár termék mennyiségének frissítése során:", error);
      }
    })
    this.cartService.fetchCartItemCount()
  }

  openOrder() {
    this.router.navigate([{ outlets: { top: ['order'] } }]);
  }

  /*removeCartItem(cartItem: any){
    this.cartService.destroyCartItem(cartItem.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getCart();
      }
    })
  } */

    
   /* cartItem(index: number, cartItem: any) {
      return cartItem.id;
    } */

}