import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  urlImages = "https://olympus.arvispace.com/Ecommerce/assets/Products-Images/";
  products: Producto[] = [];

  constructor(private ProductService: ProductService){}

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts(){
    this.ProductService.getProducts().subscribe((data) => {
      return this.products = data;
    })
  }

  addToCart(product:Producto){
    return this.ProductService.addProduct(product);
  }
}
