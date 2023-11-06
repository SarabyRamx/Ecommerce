// carrito.component.ts
import { Component } from '@angular/core';
import { ProductService } from '../../servicios/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})

export class CarritoComponent {
  cart: any[] = [];
  email: string = '';
  productData: any[] = [];

  constructor(private productService: ProductService) {}

  

  /*processSale() {
    // Lógica para procesar la venta en el servicio, usando el valor de 'email'.
    this.productService.processSale(this.email);


  }*/
}