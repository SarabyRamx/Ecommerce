import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private APIUrl = 'http://localhost/Ecommerce/Carrito.php'; 

  constructor(private http: HttpClient) { }

  addToCart(productId: number, quantity: number): Observable<any> {
    const requestData = {
      product_id: productId,
      q: quantity
    };

    return this.http.post(this.APIUrl, requestData);
  }
}
