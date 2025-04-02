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
    this.orderapi.getOrder().subscribe({
      next: (response: any) => {
        const order = response[0]; // Az első rendelés
        const items = order.items; // Az összes item
        
        items.forEach((item: any, index: any) => {
          console.log("adatok amiket kapok: ", `Item ${index + 1}:`, item);
          console.log("Status: ", order.status);
          console.log("Product Name: ", item.product.name);
          console.log("Quantity: ", item.quantity);
    
          // Pusholjuk a szükséges adatokat az ordersData tömbbe
          this.ordersData.push({
            status: order.status,
            quantity: item.quantity,
            total_price: order.total_price,
            productName: item.product.name,
            image: item.product.image,
            category: item.product.category
          });
    
          this.alreadyOrdered = true;
          this.notOrderedYet = false;
        });
      }
    });
  }

}