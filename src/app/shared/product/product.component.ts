import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/modelos/product.interface';
import { inject } from '@angular/core';
import { CartService } from 'src/app/servicios/cart.service';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  //Manejar la paginacion
  p: number = 1;
  // Manejar la data ingresada en la barra de busqueda
  text: string = '';
  // Ruta donde se almancenan la imagenes
  urlImages = "https://olympus.arvispace.com/Ecommerce/assets/Products-Images/";
  // Manejar el contenido de los items retornados por el servicio
  products: Producto[] = [];
  
  constructor(private ProductService: ProductService, private serviceSearchInput: CartService) { }

  ngOnInit(): void {
    this.getProducts();
    this.serviceSearchInput.textObservable.subscribe(resultData => {
      this.filter(resultData);
    });
  }

  // Traer todos los productos
  getProducts() {
    this.ProductService.getProducts().subscribe((data) => {
      return this.products = data;
    });
  }

  // Agregar el articulo al carrito
  addToCart(product: Producto) {
    return this.ProductService.addProduct(product, 1);
  }

  // Especificar condiciones para el envio del texto/caracteres de busqueda
  filter(characters: string) {
    this.text += characters;
    if (characters !== '' && characters.length >= 3) {
      this.searchText(characters);
    } else if (characters === '') {
      this.getProducts();
      console.log('traer datos de inicio por que ya quitaste los datos tecleados...');
    }
  }

  // Servicio se encarga de mandar el parametro introducido en la barra de busqueda
  searchText(text: string) {
    //Crear objeto tipo Json para cumplir con el formato aceptado por el back
    let objetoJson = {
      text: text
    };
    this.serviceSearchInput.resultSearchBar(objetoJson).subscribe({
      next: (resultData) => {
        return this.products = resultData;
      }, error: (error) => console.log(error)
    });
  }

}
