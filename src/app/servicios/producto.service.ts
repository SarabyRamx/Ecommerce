import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://olympus.arvispace.com/Products/products2.php'; 
  private productosCartSubject: BehaviorSubject<{ productos: any[]; monto: number }> = new BehaviorSubject<{ productos: any[]; monto: number }>({ productos: [], monto: 0 });
  productosCart$: Observable<{ productos: any[]; monto: number }> = this.productosCartSubject.asObservable();


  public saveCartToLocalStorage(productos: any[], monto: number): void {
    const cartData = { productos, monto };
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  public getCartFromLocalStorage(): { productos: any[]; monto: number } | null {
    const cartDataString = localStorage.getItem('cartData');
    if (cartDataString) {
      return JSON.parse(cartDataString);
    }
    return null;
  }

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?action=getProducts`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?action=getCategories`);
  }

  enviarDatos(productos: any[], monto: number) {
    this.productosCartSubject.next({ productos, monto });
  }

  obtenerDatos(): Observable<{ productos: any[]; monto: number }> {
    return this.productosCart$;
  }

  eliminarProducto(index: number) {
    const productosActuales = [...this.productosCartSubject.value.productos];
    productosActuales.splice(index, 1);
    this.productosCartSubject.next({ productos: productosActuales, monto: this.productosCartSubject.value.monto });
  }
  
}

