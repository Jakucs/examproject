import { Component } from '@angular/core';
import { CartapiService } from '../shared/cartapi.service';
import { OrderapiService } from '../shared/orderapi.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  cartItems: any[] = [];
  overAmount: number = 0;

  constructor(
    private cartService: CartapiService,
    private orderService: OrderapiService
  ){}

  ngOnInit(){
    this.getOrderData()
  }


  getOrderData() {
    this.cartService.getCartItems().subscribe({
      next: (data: any) => {
        console.log("GETORDERDATA EREDMÉNYE: ",data)
        const cartContect = data["Kosár tartalma"];
        this.cartItems = []
        for(let i = 0; i< cartContect.length; i++){
          const termek = cartContect[i].product;
          const productHasQuantity = cartContect[i].quantity;
          this.cartItems.push({
            ...termek,
            quantity: productHasQuantity
          });
        }
        this.overAmount = data["Fizetendő összeg"];
      },
      error: (error) => {
        console.error('Hiba történt a rendelés betöltésekor: ', error);
      }
    })
  }

  takeOrder(){
    this.orderService.takeOrder().subscribe({
      next: (response) => {
        console.log('Rendelés sikeres: ', response);
      },
      error: (error) => {
        console.error('Hiba történt a rendelés leadásakor: ', error)
      }
    })
  }
}
