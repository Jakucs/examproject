import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSearchService } from '../shared/product-search.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  constructor(private route: ActivatedRoute){}

  productId!: string;
  name!: string;
  description!: string;
  category!: string;
  stars!: number;
  price!: number;
  image!: string;

  showProductDetail: boolean = true;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.name = params.get('name') || '';
      this.description = params.get('description') || '';
      this.category = params.get('category') || '';
      this.stars = parseFloat(params.get('stars') || '0');
      this.price = parseFloat(params.get('price') || '0');
      this.image = params.get('image') || '';
      console.log(this.name, this.description, this.stars, this.category)
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
    this.showProductDetail = false;
  }

  openDetail(): void {
    this.showProductDetail = true;
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
}
