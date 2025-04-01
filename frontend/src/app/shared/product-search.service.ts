import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {


  constructor() { }


  private searchQuery = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuery.asObservable(); //A BehaviorSubject egyúttal Observer is! Nemcsak Observable! Így más komponensek nemtudják megváltoztatni (next()-el) csak feliratkozni rá!


  //// Encapsulationt használunk. Ez egy OOP elv, amely arról szól, hogy egy objektum belső állapotát és működését elrejted a külvilág elől, és csak egy meghatározott interfészen keresztül teszed hozzáférhetővé.
  updateSearchQuery(query: string){
    this.searchQuery.next(query); 
  }
  //Az Angularban például ez történik, amikor egy komponenst vagy szolgáltatást úgy tervezel meg, hogy a belső állapotát (BehaviorSubject) csak egy függvény (updateSearchQuery()) módosíthatja.
}
