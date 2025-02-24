import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successfulregister',
  standalone: true,
  imports: [],
  templateUrl: './successfulregister.component.html',
  styleUrl: './successfulregister.component.css'
})
export class SuccessfulregisterComponent {

  constructor(private router: Router){}

  navigateToLogin(){
    this.router.navigate([{outlets: {top: ['login']}}]);
  }
}
