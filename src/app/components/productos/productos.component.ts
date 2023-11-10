import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../servicios/producto.service';
import { CartService } from '../../servicios/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productData: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (respuesta) => {
        if (Array.isArray(respuesta)) {
          this.productData = respuesta;
          console.log(this.productData); // Agrega este console.log para verificar los datos
        } else {
          console.error("La respuesta no es un arreglo.");
        }
      },
      (error) => {
        console.log("Error al obtener productos:", error);
      }
    );

  }
  

 agregarAlCarrito(producto: any): void {
    this.cartService.addToCart(producto.id, 1).subscribe((response) => {
      if (response.status === "success") {
        console.log("entro aquí");
        producto.agregado = true; // Marcar como agregado en la interfaz
        console.log('Producto agregado al carrito', response.message);
      } else {
        console.error('Error al agregar el producto al carrito', response.message);
      }
    });
  }
  }
