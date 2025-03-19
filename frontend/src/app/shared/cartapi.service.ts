import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserapiService } from './userapi.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  private cartItems: any[] = [];
  private cartUrl = 'http://localhost:8000/api/cart';

  private getUserCartURL = 'http://localhost:8000/api/cart-item-count';
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor(
    private http: HttpClient,
    private userApi: UserapiService
  ) { 
    /*this.loadCartFromStorage();*/
  }
  
  getCartItems() {
    console.log(this.cartUrl) //ez most kell
    const headers = this.userApi.makeHeader();
    return this.http.get(this.cartUrl, { headers });
  }

  newCartItem(data: any){
    this.cartItems.push(data);
    // this.saveCartToStorage(); // jelenleg localStorage-ból olvassuk ki hogy hány db termék van a kosárba
    const headers = this.userApi.makeHeader();
    return this.http.post(this.cartUrl, data, { headers })
  }

  modifyCartItem(cartItem: any){
    const headers = this.userApi.makeHeader();
    return this.http.put(this.cartUrl, cartItem, { headers })
  }

  modifyCartItemQuantity(cartItemId: number, quantity: number){
    const url = this.cartUrl + "/" + cartItemId
    const headers = this.userApi.makeHeader();
    return this.http.put(url, {quantity: quantity}, { headers })
  }

  destroyCartItem(id: number){
    //this.clearCart()
    const url = this.cartUrl + "/" + id
    const headers = this.userApi.makeHeader();
    // this.saveCartToStorage();
    return this.http.delete(url, { headers });
  } //EGYENKÉNT NEM TÖRÖLJÜK A LOCALSTORAGEBÓL A TERMÉKET, EZÉRT MARAD A JELÖLŐSZÁM

  destroyAllCart(){
//    this.clearCart()
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete(this.cartUrl, { headers });
  }

  addItem(item: any) {

  }

  fetchCartItemCount(): void {
    const headers = this.userApi.makeHeader();
    this.http.get<{ count: number }>(this.getUserCartURL, { headers }).subscribe( // <{ count: number }> Itt típusdefiníciót adunk meg az általunk várható válasz típusáról. A válasz, amit a szerver küld, egy objektum, amely tartalmaz egy count nevű mezőt, amely egy számot (number) képvisel. 
      (response) => {
        this.cartItemCount.next(Number(response.count)); // Frissítés
      },
      (error) => {
        console.error('Nem sikerült beolvasni a kosár tartalmát', error);
      }
    );
  }

 /* getCartItemCount(): number {
    console.log("Kosárban lévő termékek száma: ", this.cartItems.length)
    return this.cartItems.length;
  } */

/*  clearCart() {
    this.cartItems = [];
    this.saveCartToStorage();
  } */

/*  private saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  } */

/*  private loadCartFromStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);  // JSON-ból töltjük be a kosár adatokat
    }
  } */

/*  getCartItemCount(): Observable<{ count: number }> {
    const headers = this.userApi.makeHeader();
    return this.http.get<{ count: number }>(this.getUserCartURL, { headers });
  } */
}
