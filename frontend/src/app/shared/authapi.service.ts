import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  constructor(private http: HttpClient) { }

  isLoggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserName() {
    return localStorage.getItem('userName') || '';
  }

  makeHeader(){
    const token = localStorage.getItem('token');
    const header = { 'Authorization': 'Bearer' + token }
    return header;
  }

  logout(){
    const url = 'http://localhost:8000/api/logout'
    return this.http.post(url, {headers: this.makeHeader()});
  }

  register(data: any){
    const url = 'http://localhost:8000/api/register'
    return this.http.post(url, data);
  }

  login(data: any) {
    const url = 'http://localhost:8000/api/login'
    return this.http.post(url, data);
  }
}
