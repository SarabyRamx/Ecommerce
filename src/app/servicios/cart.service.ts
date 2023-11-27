import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { producto } from './datos';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private APIUrl = 'https://olympus.arvispace.com/Products/ecomerce.php'; 

  constructor(private http: HttpClient) { }

   //Mostrar datos de usuario componente HOME ----------------------- Roghelio
   datosArticulo(id: string):Observable<any> {
    return this.http.get<producto>(this.APIUrl + '?detalles='+id);
  }
  
}
