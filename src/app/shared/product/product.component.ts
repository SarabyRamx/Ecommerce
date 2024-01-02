import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/product.interface';
import { inject } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  //Manejar la paginacion
  p: number = 1;
  urlImages = "https://olympus.arvispace.com/Ecommerce/assets/Products-Images/";
  products: Producto[] = [];
  filtrados: Producto[] = [];
  categoria: number = 0;

  
  constructor(private ProductService: ProductService){
    this.ProductService.productosList$.subscribe((productos) => {
      console.log('Productos filtrados actualizados:', productos);
      this.filtrados = productos;
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.obtenerFiltrados();
  }
  
  getProducts() {
    this.ProductService.getProducts().subscribe((data) => {
      console.log('Esto es lo que retorna...', data);

      // Ahora, puedes asignar los datos a tu variable
      this.products = data;

      console.log("entonces products es: ",this.products);

      if (this.products.length > 0) {
        console.log('Los elementos de mi variable products son:', this.products);
        this.enviarListaProductos();
        //this.obtenerFiltrados();
      } else {
        console.log('No se está llenando mi variable products');
      }
    });
  }

  addToCart(product:Producto){
    return this.ProductService.addProduct(product);
  }

  enviarListaProductos(){
    console.log("esto es lo que se esta enviando al servicio: ", this.products);
    this.ProductService.recibirListaProductos(this.products);
  }

  obtenerFiltrados() {
    this.ProductService.obtenerFiltrados().subscribe((filtrados) => {
      if (filtrados) {
        this.p = 1;
        console.log("ESTO ES LO QUE YO AGARRO DE SERVICIO POR MAIN ", filtrados);
        this.filtrados = filtrados;
      } else {
        console.log("No se pudieron obtener productos filtrados");
      }
    });
  }
}
