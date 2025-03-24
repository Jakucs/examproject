import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSearchService } from '../shared/product-search.service';
import { CartapiService } from '../shared/cartapi.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private cartService: CartapiService
  ){}

  productId!: string;
  name!: string;
  description!: string;
  category!: string;
  stars!: number;
  price!: number;
  image!: string;
  id!: number;
  quantity: number = 1;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.name = params.get('name') || '';
      this.description = params.get('description') || '';
      this.category = params.get('category') || '';
      this.stars = parseFloat(params.get('stars') || '0');
      this.price = parseFloat(params.get('price') || '0');
      this.image = params.get('image') || '';
      console.log('Query paramMap:', params.keys, params);
      console.log("az id: ", this.id)
    });
  }

  generateStarRange(count: number): number[]{
    const result = [];
    for (let i = 0; i< count; i++){
      result.push(i);
    }
    return result;
  }

  closeDetail(){
    this.router.navigate(['/']);
  }

  /*
ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    this.name = params.get('name') || '';
    this.description = params.get('description') || '';
    this.category = params.get('category') || '';
    this.stars = parseFloat(params.get('stars') || '0');
    this.price = parseFloat(params.get('price') || '0');
    this.image = params.get('image') || '';
  });
}
    */

addToCart(product: any) {
  console.log("id értéke:", product)
  if (product) {
    this.cartService.newCartItem({ product_id: product, quantity: this.quantity }).subscribe({
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
  this.cartService.fetchCartItemCount()
}

}
