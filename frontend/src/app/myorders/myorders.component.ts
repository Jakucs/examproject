import { Component } from '@angular/core';
import { AuthapiService } from '../shared/authapi.service';
import { OrderapiService } from '../shared/orderapi.service';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [],
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent {

  userName!: string;
  ordersData: any[] = []
  alreadyOrdered: boolean = false;
  notOrderedYet: boolean = true;
  status!: string;

  constructor(
    private authapi: AuthapiService,
    private orderapi: OrderapiService
  ){}

  ngOnInit(){
    this.userName = this.authapi.getUserName();
    this.getOrder()
  }

  getOrder(){
    this.ordersData = []; // Töröljük a korábbi adatokat
  
    this.orderapi.getOrder().subscribe({
      next: (response: any) => {
        response.forEach((order: any) => { // Iterálunk az összes rendelésen
          const items = order.items;
  
          items.forEach((item: any, index: any) => {
            console.log("adatok amiket kapok: ", `Item ${index + 1}:`, item);
            console.log("Status: ", order.status);
            console.log("Product Name: ", item.product.name);
            console.log("Quantity: ", item.quantity);
  
            this.ordersData.push({
              status: order.status,
              quantity: item.quantity,
              total_price: item.price, // Lehet, hogy ezt máshogy kell kezelni
              productName: item.product.name,
              image: item.product.image,
              category: item.product.category
            });
  
            this.alreadyOrdered = true;
            this.notOrderedYet = false;
          });
        });
      }
    });
  }

}