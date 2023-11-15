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
  priceFilterProducts: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

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

  /*FILTROS DE PRODUCTOS*/
  getPriceProducts() {
    console.log("me estan oprimiendo");
    for(let i = 0; i < this.productosFiltrados.length; i++) {
      if(this.productosFiltrados[i].price <= 350) {
        this.priceFilterProducts.push(this.productosFiltrados[i]);
      }
    }
    if(this.priceFilterProducts.length > 0){
      console.log("esto es lo que muestra la pantalla de inicio: ",this.productData);
      console.log("estos son los productos: ",this.priceFilterProducts);
      console.log("el ultimo elemento es: ", this.priceFilterProducts[this.priceFilterProducts.length - 1]);
      this.productosFiltrados = this.priceFilterProducts;
      this.productData = this.priceFilterProducts;
    }else {
      console.log("el arreglo esta vacio");
    }
    return this.priceFilterProducts;
  }
}
