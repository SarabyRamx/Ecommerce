import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../servicios/producto.service';
import { CartService } from '../../servicios/cart.service';
import { Renderer2, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  //Manajear la paginacion
  //p: number = 1;
  productos: any[] = [];
  productData: any[] = [];
  subtotal: number = 0;
  aplicarEstilo: boolean = false;
  urlimg = "https://olympus.arvispace.com/Ecommerce/assets/Products-Images/";
  searchText: string = '';
  productosFiltrados: any[] = [];
  priceFilterProducts: any[] = [];
  filtersPrice = ["Hasta $350", "$350 a $750", "$750 a $1500", "$1500 a $3000", "$3000 y mas"];
  filtroSeleccionado: number | null = null;
  categoriaSeleccionada: string = "";
  categoriaFilter: any[] = [];
  mostrarCarrito: boolean = false;
  sizeFiltrados: number = 0;
  
  constructor(private productService: ProductService, private cartService: CartService, private el: ElementRef, private renderer: Renderer2, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.productService.sizeListProducts.subscribe((size) => {
        this.sizeFiltrados = size;
        console.log("El tamaño del los filtrados son: ", this.sizeFiltrados);
      
    });
    /*this.productService.getProducts().subscribe(
      (respuesta) => {
        console.log("Respuesta completa:", respuesta);
  
        if (Array.isArray(respuesta)) {
          this.productData = respuesta;
          this.productosFiltrados = this.productData;
          console.log("productData es: ", this.productData);
          
          console.log("productosFiltrados es: ", this.productosFiltrados);

          this.productosFiltrados.forEach(element => {
            if(element.descuento == 1){
              element.nuevoprecio = element.price - (element.porcentaje / 100) * element.price;
            }
          });
          console.log("productos filtrados: ", this.productosFiltrados);

        } else {
          console.warn("La respuesta no es un arreglo. Se manejará como una respuesta vacía.");
          console.log("Contenido de la respuesta:", respuesta);
          // Asignar un array vacío en caso de que la respuesta no sea un array
          this.productData = [];
          this.productosFiltrados = this.productData;
        }
      },
      (error) => {
        console.error("Error al obtener productos:", error);
      }
    );*/

    this.productService.getCategories().subscribe(
      (respuesta) => {
        this.categoriaFilter = respuesta;
        console.log("respuesta de servicio obtener categorias: ", this.categoriaFilter);
      }
    )  

      //this.productService.getCartFromLocalStorage();

    /*const cartData = this.productService.getCartFromLocalStorage();
    if (cartData) {
      this.productos = cartData.productos;
      console.log('Estos son los articulos del ls:' + this.productos);
      this.actualizarSubtotal();
      //this.aplicarEstilo = true;
      this.mostrarCarrito = true;
      console.log("los datos del carrito son: ", this.productos);
    }*/

    const storedCartData = this.productService.getCartFromLocalStorage();
    if (storedCartData) {
      this.productService.myList = storedCartData.productos;
      this.productService.sizeCartSubject.next(this.productService.myList.length);
      this.productService.myCart.next(this.productService.myList);
  }
}

  agregarAlCarrito(index: number): void {
    const productoExistente = this.productos.find(p => p.idProducto === this.productosFiltrados[index].idProducto);
  
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      const nuevoProducto = {
        idProducto: this.productosFiltrados[index].idProducto,
        nombre: this.productosFiltrados[index].nombre,
        precio: parseFloat(this.productosFiltrados[index].precio),
        imageurl: this.productosFiltrados[index].imageurl,
        descripcion: this.productosFiltrados[index].descripcion,
        Categoria_idCategoria: this.productosFiltrados[index].Categoria_idCategoria,
        descuento: this.productosFiltrados[index].descuento,
        porcentaje: parseFloat(this.productosFiltrados[index].porcentaje),
        cantidaddescuento: parseFloat(this.productosFiltrados[index].cantidaddescuento),
        preciototal: parseFloat(this.productosFiltrados[index].preciototal),
        cantidad: 1,
      };
  
      // Aplicar descuento solo cuando se crea el producto
      /*if (nuevoProducto.descuento === '1') {
        nuevoProducto.nuevoprecio = this.calcularPrecioConDescuento(nuevoProducto.price, nuevoProducto.porcentaje);
        nuevoProducto.price = nuevoProducto.nuevoprecio || nuevoProducto.price;
        nuevoProducto.price = parseInt(nuevoProducto.price.toFixed(0));
      }*/
      this.productos.push(nuevoProducto);
      console.log("esto es lo que se está enviando al carrito: ", this.productos);
    }
    this.actualizarSubtotal();
    this.aplicarEstilo = true;
    this.mostrarCarrito = true;

    //this.productService.saveCartToLocalStorage(this.productos, this.subtotal);
  }
  
  
  calcularPrecioConDescuento(precioOriginal: number, porcentajeDescuento: number): number {
    return precioOriginal - (precioOriginal * porcentajeDescuento / 100);
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
    //this.productService.saveCartToLocalStorage(this.productos, this.subtotal);
  }

  actualizarSubtotal(): void {
    this.subtotal = this.productos.reduce((total, producto) => total + (producto.cantidad * producto.preciototal), 0);
  }

  vaciarCarrito() {
    this.productos = [];
    this.closeCar();
    //this.productService.saveCartToLocalStorage(this.productos, this.subtotal);
  }

  /*openCar(){
    if(this.productos.length > 0){
      this.aplicarEstilo = !this.aplicarEstilo;
    } else {
      this.notificarCarritoVacio();
    }
    
  }*/

  closeCar() {
    this.aplicarEstilo = !this.aplicarEstilo;
  }
  realizarBusqueda(): void {
    console.log("alguien esta escribiendo");
    const textoBusqueda = this.searchText.toLowerCase();
  
    // Filtra los productos solo si hay texto de búsqueda
    if (textoBusqueda.trim() !== '') {
      this.productosFiltrados = this.productData.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
      );
    } else {
      // Si no hay texto de búsqueda, muestra todos los productos
      this.productosFiltrados = this.productData;
    }
  }


  getPriceProducts(index: number) {
    // Verifica si el filtro seleccionado es el mismo que el anterior, si es así, anula el filtro
    if (this.filtroSeleccionado === index) {
      this.filtroSeleccionado = null;
    } else {
      // Si no hay un filtro seleccionado, establece el índice actual
      this.filtroSeleccionado = index;
    }
  
    // Limpia el arreglo antes de cada nueva operación
    this.priceFilterProducts = [];
    console.log("la categoria actual es: ", this.categoriaSeleccionada);
  
    // Si hay un filtro seleccionado, aplica la lógica de filtrado
    if (this.filtroSeleccionado !== null) {
      const selectedFilter = this.filtersPrice[this.filtroSeleccionado];
  
      // Filtra los productos según la categoría seleccionada
      let productosFiltradosCategoria = this.productData;
  
      // Filtra los productos según la categoría seleccionada y si hay descuento
      if (this.categoriaSeleccionada === "Descuentos") {
        productosFiltradosCategoria = productosFiltradosCategoria.filter(element => parseInt(element.descuento) === 1);
      } else {
        switch (this.categoriaSeleccionada) {
          case "Suplementos":
            productosFiltradosCategoria = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 2);
            break;
          // Agrega más casos según sea necesario
          case "Galletassss":
            productosFiltradosCategoria = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 3);
            break;
          case "Accesorios de entrenamiento":
            productosFiltradosCategoria = this.productData.filter(element => parseInt(element.id_category) === 3);
            break;
          case "Bebidas":
            productosFiltradosCategoria = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 1);
            break;
          case "Descuentos":
            productosFiltradosCategoria = this.productData.filter(element => parseInt(element.descuento) === 1);
            break;
          default:
            // Para "Todas" u otros casos, utiliza todos los productos
            productosFiltradosCategoria = this.productData;
            break;
        }
      }
  
      // Filtra los productos según el rango de precio
      if (productosFiltradosCategoria.length > 0) {
        if (selectedFilter === this.filtersPrice[0]) {
          this.priceFilterProducts = productosFiltradosCategoria.filter(producto => parseInt(producto.precio) <= 350);
        } else if (selectedFilter === this.filtersPrice[1]) {
          this.priceFilterProducts = productosFiltradosCategoria.filter(producto => {
            const precio = parseInt(producto.precio);
            return precio >= 350 && precio <= 750;
          });
        } else if (selectedFilter === this.filtersPrice[2]) {
          this.priceFilterProducts = productosFiltradosCategoria.filter(producto => {
            const precio = parseInt(producto.precio);
            return precio >= 750 && precio <= 1500;
          });
        }
      }
    } else {
      // Si no hay filtro seleccionado, muestra todos los productos de la categoría seleccionada
      switch (this.categoriaSeleccionada) {
        case "Suplementos":
          this.priceFilterProducts = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 2);
          break;
        // Agrega más casos según sea necesario
        case "Galletassss":
          this.priceFilterProducts = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 3);
          break;
        case "Accesorios de entrenamiento":
          this.priceFilterProducts = this.productData.filter(element => parseInt(element.id_category) === 3);
          break;
        case "Bebidas":
          this.priceFilterProducts = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 1);
          break;
        case "Descuentos":
          this.priceFilterProducts = this.productData.filter(element => parseInt(element.descuento) === 1);
          break;
        default:
          // Para "Todas" u otros casos, utiliza todos los productos
          this.priceFilterProducts = [...this.productData];
          break;
      }
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
  
getProductsCategory(event: any): void {
  this.categoriaSeleccionada = event.target.value;
  console.log("Categoría seleccionada:", this.categoriaSeleccionada);

  // Llama al método para aplicar filtros
  this.aplicarFiltros();
}

aplicarFiltros(): void {
  // Aplica el filtro de categoría
  this.filtrarPorCategoria();

  // Aplica el filtro de precio si this.filtroSeleccionado es un número
  if (typeof this.filtroSeleccionado === 'number') {
    this.getPriceProducts(this.filtroSeleccionado);
  }
}

filtrarPorCategoria(): void {
  switch (this.categoriaSeleccionada) {
    case "Suplementos":
      this.productosFiltrados = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 2);
      break;
    /*case "Accesorios de entrenamiento":
      this.productosFiltrados = this.productData.filter(element => parseInt(element.id_category) === 3);
      break;*/
    /*case "Ropa y calzado":
      this.productosFiltrados = this.productData.filter(element => parseInt(element.id_category) === 10);
      break;*/
    /*case "Bebidas":
      this.productosFiltrados = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 1);
      break;
    case "Galletassss":
      this.productosFiltrados = this.productData.filter(element => parseInt(element.Categoria_idCategoria) === 3);
      break;
    default:
      // Para "Todas" o cualquier otro caso, muestra todos los productos
      this.productosFiltrados = this.productData;
      break;
  }
}*/

/*resumenProductos(){
  console.log("tu compra incluye:", this.productos);
  console.log("vas a pagar: ", this.subtotal);
  this.productService.enviarDatos(this.productos, this.subtotal);
  this.productService.saveCartToLocalStorage(this.productos, this.subtotal);
}*/

/*notificarCarritoVacio() {
  this.snackBar.open('Tu carrito esta vacio', 'Cerrar', {
    duration: 2000,
    panelClass: ['notificacion-carrito-vacio'],
  });
}*/
    }
  }
}
