import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminapiService } from '../shared/adminapi.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productPropertyList: any[] = [];

  constructor(private adminapi: AdminapiService){}

  ngOnInit(){
    this.getProducts()
  }

  getProducts(){
    this.adminapi.getProducts().subscribe({
      next: (data:any) =>{
        console.log(data);
        this.productPropertyList = data;
      },
      error: (error) => {
        console.log("Hiba a termék betöltésekor: ", error)
      }
    });
  }

  generateStarRange(count: number): number[]{
    const result = [];
    for (let i = 0; i< count; i++){
      result.push(i);
    }
    return result;
  }
}
