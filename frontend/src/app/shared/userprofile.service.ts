import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthapiService } from './authapi.service';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  showProfile = true;

  private apiURL = 'http://localhost:8000/api/profile'

  constructor(
    private http: HttpClient,
    private authapi: AuthapiService
  ) { }

  getUserData(): Observable<any>{
    const headers = this.authapi.makeHeader();
    return this.http.get<any>(this.apiURL, { headers });
  }

  updateUserData(userData: any): Observable<any> {
    const headers = this.authapi.makeHeader();
    return this.http.put(this.apiURL, userData, { headers });
  }
}