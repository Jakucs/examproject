import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminapiService } from '../shared/adminapi.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ProductSearchService } from '../shared/product-search.service';
import { OrderapiService } from '../shared/orderapi.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  showTable = false;
  showOrderTable = false;
  productList: any[] = [];
  orderList: any[] = [];
  id!: number;
  name!: string;
  price!: number;
  stars!: number;
  description!: string;
  category!: string;
  stock!: number;
  image!: string;

  orderId!: number;
  order_user_name!: string;
  status!: string;
  orderDate!: Date
  orderedProducts: any[] = [];
  userOrderedDatas: any[] =[];
  orderStatus!: string;

  AdminError: any = false;
  searchProductText: string = '';
  searchQuery: string = '';

  editMode = false;

  constructor(
    private adminapi: AdminapiService,
    private productSearchService: ProductSearchService,
    private router: Router,
    private orderapi: OrderapiService,
    private app: AppComponent,
  ){}

  saveOrderedDataStatus(id: any){
    this.orderapi.modifyOrderStatus(id, this.orderStatus).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getOrders();
      }, error: (error) => {
        console.log("Hiba")
      }
    })
  }

  onSearchChange(){
    this.productSearchService.updateSearchQuery(this.searchProductText)
  }

  toggleTable(){
    this.showTable = !this.showTable
    this.AdminError = false;
  }

  toggleOrderTable(){
    this.showOrderTable = !this.showOrderTable
    this.AdminError = false;
  }

  hiddenUserTable(){
    this.showTable = false;
  }

  hiddenOrderTable(){
    this.showOrderTable = false;
  }

  navigateToSuperadminsite(){
    console.log("Navigálás...")
    const role = localStorage.getItem('role')
    if(role==='superadmin'){
      this.router.navigate([{ outlets: { admin: ['superadminsite'] } }]);
    }else{
      this.AdminError = true;
    }
  }

  ngOnInit(){
    this.productSearchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
    this.getProducts();
    this.getOrders();
  }

  getProducts(){
    this.adminapi.getProducts().subscribe({
      next: (data:any) => {
        console.log("TERMÉKEK LISTÁJA: ", data) //<--- EZE NEM LÁTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM
        this.productList = data;
      },
      error: (error) => {}
    })
  }

  getOrders(){
    this.adminapi.getOrders().subscribe({
      next: (data:any) => {
        console.log("Rendelések listája: ", data)
        this.orderList = data;
      },
      error: (error) => {}
    })
  }

  editOrderStatus(order: any){
    this.editMode = true
    this.orderId = order.id
    this.order_user_name = order.user.name
    this.status = order.status
    this.orderDate = order.created_at
    this.orderedProducts = order.items
    this.orderStatus = order.status
    this.userOrderedDatas.push({
      "email": order.user.email,
      "first_name": order.user.first_name,
      "last_name": order.user.last_name,
      "birth_date": order.user.birth_date,
      "phone_number": order.user.phone_number,
      "postal_code": order.user.postal_code,
      "city": order.user.city,
      "street": order.user.street,
      "house_number": order.user.house_number,
      "floor": order.user.floor,
      "door": order.user.door
    })
    console.log(this.userOrderedDatas)
    console.log("order státusz: ", this.orderStatus)

    /*
    KÉNE KÜLDENI A BACKENDNEK A STÁTUSZ MÓDOSÍTÁST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      */
  }

  startAdd(){
    this.editMode = false

    this.id = 0
    this.name = ""
    this.price = 0
    this.stars = 0
    this.description = ""
    this.category = ""
    this.stock = 0;
    this.image = "";
  }

  saveProduct(){
    if(this.editMode){
      this.updateProduct();
    }else{
      this.addProduct();
    }
  }

  updateProduct(){
    const product = {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      price: this.price,
      stars: this.stars,
      stock: this.stock,
      image: this.image
    }

    this.adminapi.updateProduct(product).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getProducts();
      }
    })
  }

  addProduct(){
    console.log("Mentés...")
    const product = {
      name: this.name,
      price: this.price,
      stars: this.stars,
      description: this.description,
      category: this.category,
      stock: this.stock,
      image: this.image
    }
    this.adminapi.createProduct(product).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getProducts();
      }
    })
  }

  editProduct(product: any){
    this.editMode = true
    console.log(product.id, product.name)
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.stars = product.stars
    this.stock = product.stock
    this.image = product.image
  }

  deleteProduct(id: number){
    console.log("Törlés...")
    this.adminapi.deleteProduct(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getProducts();
      }
    })
  }

}
