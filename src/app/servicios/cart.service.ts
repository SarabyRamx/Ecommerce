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
  // Buscador ok -> https://www.youtube.com/watch?v=ENsaGFxuynQ
  // Buscador -> https://www.youtube.com/watch?v=dbTXDyT5s0M
  //Ruta de api base
  private api = 'https://olympus.arvispace.com/Products/api/index.php';
  //Ruta api Okay
  private api_ok = 'https://olympus.arvispace.com/Products/api/api-rest/';
  // Declarar variables - manejo de la barra de busqueda
  private textSubject: BehaviorSubject<string>
  public textObservable: Observable<string>
  
  constructor(private http: HttpClient, private router: Router) {
    // Inicializar variables
    this.textSubject = new BehaviorSubject<string>('');
    this.textObservable = this.textSubject.asObservable();
   }
  // MANEJAR BARRA DE BUSQUEDA ************* MANEJAR BARRA DE BUSQUEDA *************** MANEJAR BARRA DE
  //Emitir el contenido que se teclea en el input BARRA DE BUSQUEDA
  emitText(characters: string){
    //Emitir los caracteres tecleados
    this.textSubject.next(characters);
  }

  resultSearchBar(characters: any): Observable<Producto[]>{
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const response = this.http.post<Producto[]>(`${this.api_ok}search_char.php`, characters, { headers });
    return response;
  }

  // TIENDA ********** TIENDA *********** TIENDA ********** TIENDA *********** TIENDA ********** TIENDA
  
  getAllProducts(): Observable<producto[]> {
    const response = this.http.get<producto[]>(`${this.api}?allproducts`);
    // console.log(response);
    return response
  }

  //Traer articulos por id - componente detalles
  getOneProduct(id: any): Observable<Producto[]> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const response = this.http.post<Producto[]>(`${this.api_ok}one_item.php`, id, { headers });
    return response
  }

  //Traer articulos relacionados pasando como parametro un ide por referencia
  getRelationItems(id: any): Observable<Producto[]> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const response = this.http.post<Producto[]>(`${this.api_ok}relation_items.php`, id, { headers });
    return response
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
  private urlartduino = '192.168.100.37';
  // PRUEBAS ARDUINO 
  prueba(data: any):Observable<any> {
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const response = this.http.post(`${this.urlartduino}`, data, {headers});
    return response
  }
}
