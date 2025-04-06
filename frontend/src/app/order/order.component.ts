import { Component } from '@angular/core';
import { CartapiService } from '../shared/cartapi.service';
import { OrderapiService } from '../shared/orderapi.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  cartItems: any[] = [];
  overAmount: number = 0;
  orderExist: boolean = false;
  errorMessageFromBackend: string = "";
  successfullMessageFromBackend: string = "";
  showGoToProfil: boolean = false;
  showSuccessfullCard: boolean = false;


  constructor(
    private cartService: CartapiService,
    private orderService: OrderapiService,
    private router: Router
  ){}

  ngOnInit(){
    this.getOrderData()
  }

  goToProfile(){
    this.router.navigate([{ outlets: { top: ['profil'] } }]) 
  }

  getOrderData() {
    this.cartService.getCartItems().subscribe({
      next: (data: any) => {
        console.log("GETORDERDATA EREDMÉNYE: ",data)
        const cartContect = data["Kosár tartalma"];
        this.cartItems = []
        for(let i = 0; i< cartContect.length; i++){
          const termek = cartContect[i].product;
          const productHasQuantity = cartContect[i].quantity;
          this.cartItems.push({
            ...termek, /* IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT */
            quantity: productHasQuantity
          });
        }
        this.overAmount = data["Fizetendő összeg"];
      },
      error: (error) => {
        console.error('Hiba történt a rendelés betöltésekor: ', error);
      }
    })
  }


  takeOrder(){
    this.orderService.takeOrder().subscribe({
      next: (response: any) => {
        console.log('Rendelés sikeres: ', response);
        this.showSuccessfullCard = true; /* esetleg egyszerűbben is meglehetett volna oldani a stílusozást több "helyszínen" */
        this.orderExist = true;
        this.successfullMessageFromBackend = `
        <hr>
        Köszönjük szépen a rendelésed! <hr>
        <span class="order">Státusz: Feldolgozás alatt</span> <hr>

                            <a href="app.component.html" class="btn btn-outline-success">
                        Vásárlás folytatása <i class="bi bi-arrow-right me-2"></i>
                    </a>

        `
      },error: (error: any) => {
        console.error('Hiba történt a rendelés leadásakor: ', error)
        this.errorMessageFromBackend = `
        <span class="order-error">Hiba történt a rendelés során!</span> <hr>
        ${this.router.navigate([{outlets: {top: ['profil']}}])};
        `;
        this.showGoToProfil = true;
      }

      /*
        HA NINCS ELÉG STOCK AKKOR IS ÁTIRÁNYÍT A PROFILOM OLDALRA! ÍGY A FELHASZNÁLÓ NEMTUDJA MIVAN!!!!!!!!!!
      */

      /* NEXT: JÓ BACKEND ÜZENET FELHASZNÁLÓNAK ÁTALAKÍTANI
            next: (response: any) => {
        console.log('Rendelés sikeres: ', response);
        this.orderExist = true;
        this.successfullMessageFromBackend = `
        Köszönjük szépen a rendelésed! <br>
        ${response.message} <br>
        <span class="order">Státusz: ${response.order.status}</span> <br>
        <span class="order">Végösszeg: €${response.order.total_price}</span> <br>
        <span class="order">Rendelés ideje: ${response.order.updated_at}</span>
        `
      }
      */


      //ERROR: JÓ BACKEND ÜZENET FELHASZNÁLÓNAK ÁTALAKÍTANI
      /*error: (error: any) => {
        console.error('Hiba történt a rendelés leadásakor: ', error)
        this.errorMessageFromBackend = `
        <span class="order-error">Hiba történt a rendelés során!</span> <hr>
        ${error.error.message}
        `;
        this.showGoToProfil = true;
      }*/

    })
  }
}
