import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminapiService } from '../shared/adminapi.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  showTable = false;
  productList: any[] = [];
  id!: number;
  name!: string;
  price!: number;
  stars!: number;
  description!: string;
  category!: string;
  stock!: number;
  image!: string;

  AdminError: any = false;

  editMode = false;

  constructor(
    private adminapi: AdminapiService,
    private router: Router,
    private app: AppComponent
  ){}


  toggleTable(){
    this.showTable = !this.showTable
  }

  navigateToSuperadminsite(){
    console.log("Navigálás...")
    const role = localStorage.getItem('role')
    if(role==='superadmin' || role ==='admin'){
      this.router.navigate([{ outlets: { admin: ['superadminsite'] } }]);
    }else{
      this.AdminError = true;
    }
  }

  ngOnInit(){
    this.getProducts();
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
