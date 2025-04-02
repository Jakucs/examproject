import { Component } from '@angular/core';
import { AdminapiService } from '../shared/adminapi.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductSearchService } from '../shared/product-search.service';

@Component({
  selector: 'app-superadmin',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.css'
})
export class SuperadminComponent {
  userList: any[] = [];
  adminId!: number;
  adminName!: string;
  adminEmail!: string;
  adminPassword!: string;
  role!: string;
  userId!: number;
  userName!: string;
  superadmin: boolean =false;

  searchUserText: string = '';
  searchQuery: string = '';

  constructor(
    private adminapi: AdminapiService,
    private productSearchService: ProductSearchService,
    private router: Router
  ){}

  ngOnInit(){
    this.productSearchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
    this.getUsers();
  }

  onSearchChange(){
    this.productSearchService.updateSearchQuery(this.searchUserText)
  }

  getUsers(){
    this.adminapi.getUsers().subscribe({
      next: (data:any) => {
        this.userList = data;
        console.log(data)
      },
      error: (error) => {}
    })
  }

/*  startAddAdmin(){
    this.adminId = 0
    this.adminName = ""
    this.adminEmail = ""
    this.adminPassword = ""
    this.role = 1
  } */

/*  saveAdmin(){
    console.log("Mentés...")
    const user = {
      id: this.adminId,
      name: this.adminName,
      email: this.adminEmail,
      password: this.adminPassword,
      role: 1
    }
    this.adminapi.createAdmin(user).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getUsers();
      }
    })
  }
*/


  updateUser(){
    const user = {
      user_id: this.userId,
      name: this.userName,
      role: this.role
    }

    if(this.role==='admin'){
      this.adminapi.createAdmin(user).subscribe({
        next: (data: any) => {
          console.log('Admin létrehozva', data);
          this.getUsers();
        }
      });
    }else if ( this.role === 'user'){
      this.adminapi.revokeAdmin(user).subscribe({
        next: (data: any) => {
          console.log('Admin jog visszavonva', data);
          this.getUsers();
        }
      });
    }


  }


  editUser(user: any){
    console.log(user.id, user.email, user.role)
    this.userId = user.id
    this.userName = user.name
    this.role = user.role
  }

  deleteUser(id: number){
    console.log("Törlés...")
    this.adminapi.deleteUser(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.getUsers();
      }
    })
  }

  backToAdmin(){
      console.log("Navigálás...")
      this.router.navigate([{ outlets: { admin: ['adminsite'] } }]);
  }

}
