import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserapiService } from './userapi.service';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  private cartItems: any[] = [];
  private cartUrl = 'http://localhost:8000/api/cart';

  constructor(
    private http: HttpClient,
    private userApi: UserapiService
  ) { 
    this.loadCartFromStorage();
  }
  
  getCartItems() {
    console.log(this.cartUrl) //ez most kell
    const headers = this.userApi.makeHeader();
    return this.http.get(this.cartUrl, { headers });
  }

  newCartItem(data: any){
    this.cartItems.push(data);
    this.saveCartToStorage(); // jelenleg localStorage-ból olvassuk ki hogy hány db termék van a kosárba
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
    return this.http.delete(url, { headers });
  } //EGYENKÉNT NEM TÖRÖLJÜK A LOCALSTORAGEBÓL A TERMÉKET, EZÉRT MARAD A JELÖLŐSZÁM

  destroyAllCart(){
    this.clearCart()
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete(this.cartUrl, { headers });
  }

  addItem(item: any) {

  }

  getCartItemCount(): number {
    console.log("Kosárban lévő termékek száma: ", this.cartItems.length)
    return this.cartItems.length;
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);  // JSON-ból töltjük be a kosár adatokat
    }
  }
}
