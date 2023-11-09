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
// Agragado de la imagen
@Component({
  selector: 'app-my-component',
  template: `
    <img src="assets/myimage.jpg" alt="Mi Imagen">
  `,
})
export class MyComponent {}

// Imagenes
export class ProductListComponent {
  products = [
    { id: 1, name: 'proteina', imageUrl: '../assets/img/proteina.jpg' },
    { id: 2, name: 'powerade', imageUrl: 'src/assets/img/powerade.jpg' },
    // Agrega más productos según sea necesario
  ];
}0