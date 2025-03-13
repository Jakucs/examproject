import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminapiService } from '../shared/adminapi.service';
import { CartapiService } from '../shared/cartapi.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productPropertyList: any[] = [];
  activeCategory: string = '*';

  constructor(
    private adminapi: AdminapiService,
    private cartService: CartapiService
  ){}

  ngOnInit(){
    this.getProducts()
  }

  getProducts(){
    this.adminapi.getProducts().subscribe({
      next: (data:any) =>{
        console.log(data);
        this.productPropertyList = data;
        console.log("ProductPropertyListnek tartalmaznia kell a product id-t: ", this.productPropertyList);
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

  addToCart(product: any) {
    if (product && product.id) {
      this.cartService.newCartItem({ product_id: product.id, quantity: 1 }).subscribe({
        next: (data: any) => {
          console.log("Termék hozzáadva a kosárhoz:", data);
        },
        error: (error) => {
          console.error("Hiba történt a kosárba helyezés során:", error);
        }
      });
    } else {
      console.error("A termék nem tartalmazza az id mezőt.");
    }
  }

  setActiveCategory(category: string){
    this.activeCategory = category;
  }
  
}
