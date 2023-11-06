import { Component, OnInit} from '@angular/core';
import { ProductService } from '../../servicios/producto.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  productData: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((respuesta) => {
      console.log("3333");

      if (Array.isArray(respuesta)) {
        // Mapea los datos de respuesta si es necesario
        console.log(respuesta);
        this.productData = respuesta;
      } else {
        console.error("La respuesta no es un arreglo.");
      }
    });
  }
  
  agregarAlCarrito(producto: any): void {
    // Lógica para agregar el producto al carrito
    producto.agregado = true;
  }

  // Resto del código
}
