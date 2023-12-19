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

  
  constructor(private ProductService: ProductService){}

  ngOnInit(): void {
      this.getProducts();
      console.log("los elementos de mi variable products es: ", this.products);
      console.log('antes que nada buenas noches arena mexico... doremi');
  }

  getProducts(){
    this.ProductService.getProducts().subscribe((data) => {
      console.log(data);
      console.log('esto es lo que retorna...');
      return this.products = data;
    });
    }

  addToCart(product:Producto){
    return this.ProductService.addProduct(product);
  }

  enviarListaProductos(){
    console.log("esto es lo que se esta enviando al servicio: ", this.products);
    this.ProductService.recibirListaProductos(this.products);
  }
}
