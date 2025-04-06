import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(
    private http: HttpClient,
    private authapi: AuthapiService
  ) { }
  productsURL = 'http://localhost:8000/api/products'
  usersURL = 'http://localhost:8000/api/users'
  ordersURL = 'http://localhost:8000/api/orders'
  setAdminURL = 'http://localhost:8000/api/set-admin'
  revokeAdminURL = 'http://localhost:8000/api/revoke-admin'

  getProducts(){
    return this.http.get(this.productsURL)
  }

  createProduct(data: any){
    const headers = this.authapi.makeHeader();
    return this.http.post(this.productsURL, data, { headers })
  }

  updateProduct(product: any){
    const headers = this.authapi.makeHeader();
    const url = this.productsURL + "/" + product.id
    return this.http.put(url, product, { headers })
  }

  deleteProduct(id: number){
    const headers = this.authapi.makeHeader();
    const url = this.productsURL + "/" + id;
    return this.http.delete(url, { headers })
  }



  getUsers(){
    const headers = this.authapi.makeHeader();
    return this.http.get(this.usersURL, { headers });
  }

  createAdmin(data: any){
    const headers = this.authapi.makeHeader();
    return this.http.post(this.setAdminURL, data, { headers })
  }

  revokeAdmin(data: any){
    const headers = this.authapi.makeHeader();
    return this.http.post(this.revokeAdminURL, data, { headers })
  }

  updateUser(user: any){
    const headers = this.authapi.makeHeader();
    return this.http.post(this.setAdminURL, user, { headers })
  }

  deleteUser(id: number){
    const headers = this.authapi.makeHeader();
    const url = this.usersURL + "/" + id;
    return this.http.delete(url, { headers })
  }

  getOrders(){
    const headers = this.authapi.makeHeader();
    return this.http.get(this.ordersURL, { headers })
  }

  onIsActiveStatus(user: any){
    const headers = this.authapi.makeHeader();
    return this.http.post(this.usersURL + "/activate", {user_id: user.id}, { headers })
  }

  offIsActiveStatus(user: any){
    const headers = this.authapi.makeHeader();
    return this.http.post(this.usersURL + "/deactivate", {user_id: user.id}, { headers })
  }
}
