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
        const items = response[0].items
        items.forEach((item: any, index: any)=>{
          console.log("adatok amiket kapok: ", `Item ${index + 1}:`, item);
          console.log(item.product.name, item.product.description )
          this.ordersData.push(item.product)
          this.alreadyOrdered = true;
          this.notOrderedYet = false;
        })
      }
    })
  }

}
