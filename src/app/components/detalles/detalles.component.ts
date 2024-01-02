import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/modelos/product.interface';
import { CartService } from 'src/app/servicios/cart.service';
import { producto } from 'src/app/servicios/datos';
import { ProductService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})

export class DetallesComponent implements OnInit {
  urlimg = "https://olympus.arvispace.com/Ecommerce/assets/Products-Images/";
  id_articulo: string = '';
  productos: Producto[] = [];
  relacionados: Producto[] = [];
  productos_car: Producto [] = [];

  //Manejar el estado del input
  valorInput: number = 1;
  inputDeshabilitado: boolean = false;

  constructor(private service: CartService,
    private ProductService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  //Agregar/sumar +1 a la cantidad del input
  add1() {
    this.valorInput = +this.valorInput + 1;
    this.inputDeshabilitado = false;
  }

  //Descontar/restar -1 a la cantidad del input
  less() {
    if (this.valorInput <= 1) {
      this.inputDeshabilitado = true;
    } else {
      this.valorInput = this.valorInput - 1;
      this.inputDeshabilitado = false;
    }
  }

  //Hacer la validacion / aceptar solo numeros
  soloNumeros(event: KeyboardEvent) {
    const teclaPresionada = event.key;
    const esNumero = /^[0-9]+$/.test(teclaPresionada);
    if (!esNumero) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    //Capturar el valor que viene de la url
    const x = this.activeRoute.snapshot.paramMap.get('id');
    this.id_articulo = x!;

    //Mandar a traer los arcitulos guardados en local storage
    this.ProductService.getCartFromLocalStorage();
    //Mandar a traer los datos del los articulos
    this.showDataURL(+this.id_articulo);
    //Mnadar a traer los articulos relacionados
    this.relationItems(+this.id_articulo);
  }

  //Traer los datos del articulo pasando el parametro que viene de la URL
  showDataURL(ide: number) {
    //Crear objeto tipo Json para cumplir con el formato aceptado por el back
    let objetoJson = {
      id: ide
    };
    //Mandar a traer los datos del articulo selecionado
    this.service.getOneProduct(objetoJson).subscribe({
      next: (resultData) => {
        //console.log(resultData);
        return this.productos = Array.isArray(resultData) ? resultData : [resultData];
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  //Agregar articulo al carrito de compras
  addToCart(product: Producto, items: number) {
    return this.ProductService.addProduct(product, items);
  }

  //Articulos relacionados
  relationItems(ide: number) {
    //Crear objeto tipo Json para cumplir con el formato aceptado por el back
    let objetoJson = {
      id: ide
    };
    //Mandar a traer los datos del articulo selecionado
    this.service.getRelationItems(objetoJson).subscribe({
      next: (resultData) => {
        //console.log("Estos son los items relacionados con la categoria");
        //console.log(resultData);
        return this.relacionados = Array.isArray(resultData) ? resultData : [resultData];
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  //Apartado productos relacionados - navegar/mostrtar articulos
  navegarPagina(ide: number): void {
    //console.log("Va a navegar", url);
    this.router.navigate(['/detalles/' + ide]);
    this.showDataURL(ide);
    this.relationItems(ide);
  }

  //Detectar cuando se navega hacia atras
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    // Aquí puedes mostrar la ventana emergente con el mensaje deseado
    //if (confirm('¿Seguro que quieres volver?')) {
    //console.log('estas regresando... ando');
    //} else {
    //console.log('no estas regresando... ando');
    //}

    //Capturar el valor que viene de la url
    location.reload();
    const x = this.activeRoute.snapshot.paramMap.get('id');
    const id_actual = x!.toString();
    this.showDataURL(+id_actual);
    this.relationItems(+id_actual);
  }

  // TIENDA ********** TIENDA *********** TIENDA ********** TIENDA *********** TIENDA ********** TIENDA

}
