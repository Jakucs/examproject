import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http: HttpClient) { }
  productsURL = 'http://localhost:8000/api/products'
  usersURL = 'http://localhost:8000/users'

  getProducts(){
    return this.http.get(this.productsURL)
  }

  createProduct(data: any){
    const url = this.productsURL + "newproduct"
    return this.http.post(this.productsURL, data)
  }

  updateProduct(product: any){
    const url = this.productsURL + "/" + product.id;
    return this.http.put(url, product);
  }

  deleteProduct(id: number){
    const url = this.productsURL + "/" + id;
    return this.http.delete(url)
  }



  getUsers(){
    return this.http.get(this.usersURL);
  }

  createAdmin(data: any){
    const url = this.usersURL
    return this.http.post(this.usersURL, data)
  }

  updateUser(user: any){
    const url = this.usersURL + "/" + user.id;
    return this.http.put(url, user)
  }

  deleteUser(id: number){
    const url = this.usersURL + "/" + id;
    return this.http.delete(url)
  }
}
