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
  filtersPrice = ["Hasta $350", "$350 a $750", "$750 a $1500", "$1500 a $3000", "$3000 y mas"];

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

  /*agregarAlCarrito(index: number): void {
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
  }*/
  agregarAlCarrito(index: number): void {
    const productoExistente = this.productos.find(p => p.id === this.productosFiltrados[index].id);
  
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.productos.push({
        id: this.productosFiltrados[index].id,
        name: this.productosFiltrados[index].name,
        price: this.productosFiltrados[index].price,
        imageurl: this.productosFiltrados[index].imageurl,
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
  getPriceProducts(index: number) {
    console.log("Estos son todos los productos: ", this.productosFiltrados);
    const selectedFilter = this.filtersPrice[index];
    console.log("Me están oprimiendo, soy: ", selectedFilter);

    // Limpia el arreglo antes de cada nueva operación
    this.priceFilterProducts = [];

    // Copiar los productos filtrados previos
    this.productosFiltrados = [...this.productData];

    if (this.productosFiltrados.length > 0) {
        if (selectedFilter === this.filtersPrice[0]) {
            this.priceFilterProducts = this.productosFiltrados.filter(producto => parseInt(producto.price) <= 350);
        } else if (selectedFilter === this.filtersPrice[1]) {
            this.priceFilterProducts = this.productosFiltrados.filter(producto => {
                const precio = parseInt(producto.price);
                return precio >= 350 && precio <= 750;
            });
        } else if(selectedFilter === this.filtersPrice[2]) {
          this.priceFilterProducts = this.productosFiltrados.filter(producto => {
            const precio = parseInt(producto.price);
            return precio >= 750 && precio <= 1500;
        });
        }
    } else {
        console.log("No hay productos disponibles :(");
    }

    if (this.priceFilterProducts.length > 0) {
        console.log("Estos son los productos: ", this.priceFilterProducts);
    } else {
        console.log("El arreglo está vacío");
    }

    // Actualiza los productos filtrados
    this.productosFiltrados = this.priceFilterProducts;
    
    return this.priceFilterProducts;
}


}
