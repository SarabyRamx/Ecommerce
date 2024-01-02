import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, filter, of } from 'rxjs';
import { Producto } from '../modelos/product.interface';
import { Categoria } from '../modelos/categoria.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://olympus.arvispace.com/Products/api/api-rest/all_items.php';
  private categoryService = 'https://olympus.arvispace.com/Products/api/api-rest/get_categories.php';
  private productosCartSubject: BehaviorSubject<{ productos: any[]; monto: number }> = new BehaviorSubject<{ productos: any[]; monto: number }>({ productos: [], monto: 0 });
  productosCart$: Observable<{ productos: any[]; monto: number }> = this.productosCartSubject.asObservable();
  public productosListSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  productosList$: Observable<Producto[]> = this.productosListSubject.asObservable();
  private allProductosList: Producto[] = [];


  //lista carrito
  public myList:Producto[] = [];
  public sizeCart = this.myList.length;
  //carrito observable
  public myCart = new BehaviorSubject<Producto[]>([]);
  myCart$ = this.myCart.asObservable();
  productosList: Producto[] = [];
  filtradosPrice: Producto[] = [];

  // Tamaño del carrito observable
  public sizeCartSubject = new BehaviorSubject<number>(0);
  public sizeListProducts = new BehaviorSubject<number>(0);
  sizeCart$ = this.sizeCartSubject.asObservable();
  sizeFilters$ = this.sizeListProducts.asObservable();

  //categoria
  categoria: number = 0;

  /*Carrito localstorage methods*/

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

  /*Carrito localstorage methods*/

  constructor(private http: HttpClient) {
    this.getProducts().subscribe((productos) => {
      if(productos){
        this.allProductosList = productos;
        console.log("ALL ES:", this.allProductosList);
      }
    });
   }


  

  /*main methods*/

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
  }


  getCategories(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoryService);
  }

  /*findPerFilter(categoria: number, minimo: number, maximo?: number): Observable<Producto[]> {
    return of(this.productosList).pipe(
      map((productosList) => {
        console.log("Estos son todos mis productos:", productosList);
  
        // Filtrar por categoría
        let productosFiltrados = productosList.filter((element) => element.Categoria_idCategoria === categoria);
  
        // Filtrar por rango de precio
        if (minimo > 0) {
          productosFiltrados = productosFiltrados.filter((element) => {
            // Ajusta la lógica según tus necesidades
            return element.precio >= minimo && (maximo ? element.precio <= maximo : true);
          });
        }
  
        return productosFiltrados;
      })
    );
  }*/

  //okokokokok
  findPerFilterCategory(categoria: number): Observable<Producto[]> {
    return of(this.productosList).pipe(
      map((productosList) => {
        console.log("Estos son todos mis productos:", productosList);
        console.log("Estos son los datos de mi ALL: ", this.allProductosList);
        // Filtrar por categoría
          let productosFiltrados = productosList.filter((element) => element.Categoria_idCategoria === categoria);
        
        // Emitir el nuevo valor de productosListSubject
        this.productosListSubject.next(productosFiltrados);
  
        return productosFiltrados;
      })

    );
  }

  /*findPerFilterPrice(minimo: number, maximo: number): Observable<Producto[]> {
    return this.productosList$.pipe(
      map(productosList => {
        let productosFiltrados =  productosList.filter(element => element.preciototal >= minimo && element.preciototal <= maximo);
        //this.productosListSubject.next(productosFiltrados);
        this.productosListSubject.next(productosFiltrados);
        return productosFiltrados;
      })
    );
  }*/

  findPerFilterPrice(minimo: number, maximo: number): Observable<Producto[]> {
    return this.productosList$.pipe(
      map(productosList => {
        let productosFiltrados = productosList.filter(element => element.preciototal >= minimo && element.preciototal <= maximo);
        return productosFiltrados; // Solo retorna el valor filtrado, sin emitirlo
      })
    );
  }


  /*findPerFilterPrice(minimo: number, maximo: number): Observable<Producto[]> {
    return this.productosList$.pipe(
      map(productosList => {
        let productosFiltrados = productosList.filter(element => element.preciototal >= minimo && element.preciototal <= maximo);
        if (!this.areArraysEqual(productosFiltrados, productosList)) {
          this.productosListSubject.next(productosFiltrados);
        }
        return productosFiltrados;
      })
    );
  }
  
  // Función para comparar si dos arrays son iguales
  areArraysEqual(array1: any[], array2: any[]): boolean {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }*/
  
  

  
  
  
 /* recibirListaProductos(productos: Producto[]) {
    this.productosList = productos;
    this.productosListSubject.next(productos);
  }*/

  recibirListaProductos(productos: Producto[]) {
    this.productosList = productos;
    this.allProductosList = productos;  // Actualiza allProductosList
    this.productosListSubject.next(productos);
    this.sizeListProducts.next(this.productosList.length);
  }
  
  
  enviarFiltrados(productosFiltrados: Producto[]){
    this.productosList = productosFiltrados;
    console.log("Esto es lo que me esta pasando MAIN ", this.productosList);
    this.sizeListProducts.next(this.productosList.length);
  }

  obtenerFiltrados(): Observable<Producto[]> {
    console.log("ESTO ES LO QUE ESTOY RECIBIENDO JEJEJEJEJEJEEJ: ",this.productosList);
    return this.productosList$;
  }

  obtenerProductosFiltrados(): Producto[] {
    console.log("ESTO ES LO QUE ESTOY RECIBIENDO JEJEJEJEJEJEEJ: ",this.productosList);
    return this.productosList;
  }

  restartFilters() {
    this.productosList = this.allProductosList;  
    this.productosListSubject.next([]);
  }


  
  /*obtenerCategoria(){
    return this.categoria;
  }

  enviarCategoria(categoria: number){
    this.categoria = categoria;
  }*/



























  /*Metodos anteriores*/

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

