import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminapiService } from '../shared/adminapi.service';
import { CartapiService } from '../shared/cartapi.service';
import { ProductSearchService } from '../shared/product-search.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productPropertyList: any[] = [];
  activeCategory: string = '*';
  searchQuery: string = '';
  showProductDetail: boolean = false;
  filteredProducts: any[] = [];

  constructor(
    private adminapi: AdminapiService,
    private cartService: CartapiService,
    private productSearchService: ProductSearchService,
    private app: AppComponent
  ){}

  ngOnInit(){
    this.productSearchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });

    this.getProducts()
  }

  get filterProducts() {
    return this.productPropertyList.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectProduct(product: any) {
    (window as any).selectedProduct = product;
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
    this.cartService.fetchCartItemCount()
  }

  setActiveCategory(category: string){
    this.activeCategory = category;
  }

  scrollToProductDetail() {
    const element = document.getElementById('product-detail');
    if (element) {
      window.scrollTo({
        top: element.offsetTop, // Az elem függőleges pozíciója az oldalon, enélkül nem működik
        behavior: 'smooth' // A görgetés sima
      });
    }
  }
  
}
