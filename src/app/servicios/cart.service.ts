import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { mensaje, producto, token } from './datos';
import { Router } from '@angular/router';
import { Producto } from '../modelos/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //Ruta de pruebas
  private APIUrl = 'https://olympus.arvispace.com/Products/ecomerce.php';
  //Ruta de api base
  private api = 'https://olympus.arvispace.com/Products/api/index.php';
  //Ruta api Okay
  private api_ok = 'https://olympus.arvispace.com/Products/api/api-rest/';
  //Manejar la lista de articulos agregados en el carrito de compra
  private myList: producto[] = [];
  //carrito observable
  private myCart = new BehaviorSubject<producto[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // TIENDA ********** TIENDA *********** TIENDA ********** TIENDA *********** TIENDA ********** TIENDA

  getAllProducts(): Observable<producto[]> {
    const response = this.http.get<producto[]>(`${this.api}?allproducts`);
    // console.log(response);
    return response
  }

  getOneProduct(id: any): Observable<Producto[]> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const response = this.http.post<Producto[]>(`${this.api_ok}one_item.php`, id, { headers });
    // console.log(response);
    return response
  }

  //Mostrar datos de usuario componente HOME ----------------------- Roghelio
  datosArticulo(id: string): Observable<any> {
    return this.http.get<producto>(this.APIUrl + '?detalles=' + id);
  }

  // SESION *********** SESION ********** SESION *********** SESION ********** SESION ********** SESION
  //Validar credenciales eamil/password en componente login
  loginService(data: any): Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<token>(this.api + '?login', data, { headers })
      .pipe(
        catchError((err: any) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
            const errorMessage = err.error.msg;
            // this.toastr.error(errorMessage,'Error');
            //  alert(`Error 401: ${errorMessage}`);
            return throwError(() => errorMessage);
          } else {
            return throwError(() => 'Error desconocido');
          }
        })
      );
  }

  //Validar token
  validToken(token: string): boolean {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const sesion = this.http.post<mensaje>(this.api + '?validSesion', token, { headers });
    if (sesion) {
      console.log('Token correcto');
      return true;
    } else {
      console.log('no correcto token');
      return false;
    }
  }

  //Agregar el token al localStorage - despues de validar el login
  setToken(userToken: string): void {
    localStorage.setItem('data', userToken);
  }

  //Cerrar sesion - remover el token del localStorage
  logout() {
    localStorage.removeItem('data');
    this.router.navigate(['/login']);
  }

  //Validar que exsista el token en local storage - mostrar contenido apartir del la validacion
  isLogged(): boolean {
    return localStorage.getItem('data') ? true : false;
  }

  //Validar si existe el token en localStorage - retornar el header segun sea el caso requerido
  addHeader(): HttpHeaders {
    if (this.isLogged()) {
      //para guardar los headers que manda el API
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Custom-Header': 'valor_personalizado',
        'Authorization': 'Bearer ' + localStorage.getItem('data')
      });
      return httpHeaders;
    } else {
      //para guardar los headers que manda el API
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Custom-Header': 'valor_personalizado'
      });
      return httpHeaders;
    }
  }

  // PRUEBAS ******** PRUEBAS ********* PRUEBAS ********** PRUEBAS ********** PRUEBAS ********* PRUEBAS
  pruebas():Observable<any>{
    return this.http.get(this.APIUrl + '?prueba');
  }
}
