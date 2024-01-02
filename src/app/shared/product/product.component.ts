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
  
  filtrados: Producto[] = [];
  
  categoria: number = 0;
  
  constructor(private ProductService: ProductService, private serviceSearchInput: CartService) { 
    this.ProductService.productosList$.subscribe((productos) => {
      console.log('Productos filtrados actualizados:', productos);
      this.filtrados = productos;
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.obtenerFiltrados();
    this.serviceSearchInput.textObservable.subscribe(resultData => {
      this.filter(resultData);
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
