import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../servicios/producto.service';
import { CartService } from '../../servicios/cart.service';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productData: any[] = [];
  subtotal: number = 0;
  aplicarEstilo: boolean = false;
  urlimg = "https://olympus.arvispace.com/assets/img/prods-img/";
  searchText: string = '';
  productosFiltrados: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService, public r: Renderer2) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (respuesta) => {
        if (Array.isArray(respuesta)) {
          this.productData = respuesta;
          this.productosFiltrados = this.productData;
        } else {
          console.error("La respuesta no es un arreglo.");
        }
      },
      (error) => {
        console.log("Error al obtener productos:", error);
      }
    );
  }

  agregarAlCarrito(index: number): void {
    const productoExistente = this.productos.find(p => p.id === this.productData[index].id);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.productos.push({
        id: this.productData[index].id,
        name: this.productData[index].name,
        price: this.productData[index].price,
        imageurl: this.productData[index].imageurl,
        cantidad: 1
      });
    }

    this.actualizarSubtotal();
    this.aplicarEstilo = true;
  }

  actualizarCantidad(index: number): void {
    this.actualizarSubtotal();
    if(this.productos[index].cantidad === 0){
      this.productos.splice(index, 1);
    }
    if(this.productos.length === 0) {
      this.closeCar();
    }
  }

  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
    this.actualizarSubtotal();
    if(this.productos.length === 0) {
      this.closeCar();
    }
  }

  actualizarSubtotal(): void {
    this.subtotal = this.productos.reduce((total, producto) => total + (producto.cantidad * producto.price), 0);
  }

  vaciarCarrito() {
    this.productos = [];
    this.closeCar();
  }

  closeCar() {
    this.aplicarEstilo = !this.aplicarEstilo;
  }

  realizarBusqueda(): void {
    console.log("alguien esta escribiendo");
    const textoBusqueda = this.searchText.toLowerCase();
  
    // Filtra los productos solo si hay texto de búsqueda
    if (textoBusqueda.trim() !== '') {
      this.productosFiltrados = this.productData.filter(producto =>
        producto.name.toLowerCase().includes(textoBusqueda)
      );
    } else {
      // Si no hay texto de búsqueda, muestra todos los productos
      this.productosFiltrados = this.productData;
    }
  }
}
