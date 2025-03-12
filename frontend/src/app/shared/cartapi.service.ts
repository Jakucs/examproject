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
    const headers = this.userApi.makeHeader();
    return this.http.get(this.cartUrl, { headers });
  }

  newCartItem(data: any){
    const headers = this.userApi.makeHeader();
    return this.http.post(this.cartUrl, data, { headers })
  }

  modifyCartItem(cartItem: any){
    const url = this.cartUrl + "/" + cartItem
    return this.http.put(url, cartItem)
  }

  destroyCartItem(id: number){
    //this.clearCart()
    const url = this.cartUrl + "/" + id
    const headers = this.userApi.makeHeader();
    return this.http.delete(url, { headers });
  }

  destroyAllCart(){
    this.clearCart()
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete(this.cartUrl, { headers });
  }

  addItem(item: any) {
    this.cartItems.push(item);
    //this.newCartItem(item);
    this.saveCartToStorage();
  }

  getItemCount(): number {
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
