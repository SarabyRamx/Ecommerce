import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/modelos/product.interface';
import { ProductService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Llama a la función para cargar productos y establecer el paginador
    //this.loadProducts();
  }

}
