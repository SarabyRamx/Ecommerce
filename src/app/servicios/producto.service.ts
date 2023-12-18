import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, filter } from 'rxjs';
import { Producto } from '../modelos/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://olympus.arvispace.com/Products/api/api-rest/all_items.php'; 
  private productosCartSubject: BehaviorSubject<{ productos: any[]; monto: number }> = new BehaviorSubject<{ productos: any[]; monto: number }>({ productos: [], monto: 0 });
  productosCart$: Observable<{ productos: any[]; monto: number }> = this.productosCartSubject.asObservable();

  //lista carrito
  public myList:Producto[] = [];
  public sizeCart = this.myList.length;
  //carrito observable
  public myCart = new BehaviorSubject<Producto[]>([]);
  myCart$ = this.myCart.asObservable();

  // Tamaño del carrito observable
  public sizeCartSubject = new BehaviorSubject<number>(0);
  sizeCart$ = this.sizeCartSubject.asObservable();

  public saveProducts() {
    localStorage.setItem('carritoProducts', JSON.stringify(this.myList));
  }

  public saveCartToLocalStorage(): void {
    const cartData = { productos: this.myList, monto: this.totalCart() };
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  public getCartFromLocalStorage(): { productos: any[]; monto: number } | null {
    const cartDataString = localStorage.getItem('cartData');
    return cartDataString ? JSON.parse(cartDataString) : null;
  }

  constructor(private http: HttpClient) { }

  //Guardar carrito Local Storage

  

  getProducts(): Observable<Producto[]> {
    const response = this.http.get<Producto[]>(`${this.apiUrl}?action=getProducts`);
    console.log(response);
    return response;
  }

  addProduct(product:Producto){

    if(this.myList.length == 0){
      product.cantidad = 1;
      this.myList.push(product)
      this.myCart.next(this.myList);
    }else {
      const productMod = this.myList.find((element) => {
        return element.idProducto === product.idProducto;
      })
      if(productMod){
        productMod.cantidad = productMod.cantidad + 1;
        this.myCart.next(this.myList);
      } else {
        product.cantidad = 1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }
    }

    this.sizeCartSubject.next(this.myList.length);
    this.saveCartToLocalStorage();
  }

  deleteProduct(id:number){
    this.myList = this.myList.filter((product) => {
      return product.idProducto != id;
    })
    this.myCart.next(this.myList);
    this.sizeCartSubject.next(this.myList.length);
    this.saveCartToLocalStorage();
  }

  findProductById(id:number){
    return this.myList.find((element) => {
      return element.idProducto === id;
    })
  }

  totalCart(){
    const total = this.myList.reduce(function(acc, product){return acc + (product.cantidad * product.precio);},0);
    return total;
  }

  getMyList(){
   return this.sizeCartSubject.value;
   console.log("largo",this.sizeCartSubject.value);
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

