import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {
  showProfile = false;

  constructor(private router: Router){}

  toggleProfile(show: boolean) {
    this.showProfile = show;
  }

  navigateToProfile(){
    this.router.navigate([{outlets: {profil: 'profil' }}]);
  }
}