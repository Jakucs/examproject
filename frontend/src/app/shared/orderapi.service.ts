import { Injectable } from '@angular/core';
import { UserapiService } from './userapi.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderapiService {

  constructor(
    private http: HttpClient,
    private userApi: UserapiService
  ) { }

  orderURL = 'http://localhost:8000/api/order';
  getOrdersURL = 'http://localhost:8000/api/orders';

  takeOrder(){
    const headers = this.userApi.makeHeader();
    return this.http.post(this.orderURL, {}, { headers });
  }

  getOrder(){
    const headers = this.userApi.makeHeader();
    return this.http.get(this.getOrdersURL, { headers });
  }
}
