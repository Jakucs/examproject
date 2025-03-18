import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminapiService } from '../shared/adminapi.service';
import { Router } from '@angular/router';

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
  star!: number;

  editMode = false;

  constructor(
    private adminapi: AdminapiService,
    private router: Router
  ){}

  toggleTable(){
    this.showTable = !this.showTable
  }

  navigateToSuperadminsite(){
    console.log("Navigálás...")
    this.router.navigate([{ outlets: { admin: ['superadminsite'] } }]);
  }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.adminapi.getProducts().subscribe({
      next: (data:any) => {
        console.log(data)
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
    this.star = 0
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
      price: this.price,
      star: this.star
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
      id: this.id,
      name: this.name,
      price: this.price,
      star: this.star
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
    this.star = product.star
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
