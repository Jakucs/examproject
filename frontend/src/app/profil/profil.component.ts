import { Component } from '@angular/core';
import { AuthapiService } from '../shared/authapi.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  userName: string = '';
  userDataForm!: FormGroup

  constructor(
    private authapi: AuthapiService,
    private builder: FormBuilder
  ){}

  ngOnInit(){
    this.userName = this.authapi.getUserName();
    this.userDataForm = this.builder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    })
  }
}

//INNEN FOLYTASSAM
