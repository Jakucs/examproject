import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  constructor() { }

  makeHeader(){
    const token = localStorage.getItem('token');
    const header = { 'Authorization': 'Bearer' + token }
    return header;
  }
}
