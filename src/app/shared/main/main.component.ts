import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria.interface';
import { Producto } from 'src/app/modelos/product.interface';
import { ProductService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: Categoria[] = [];
  idcategory: number = 0;
  filtrados: Producto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Llama a la función para cargar productos y establecer el paginador
    //this.loadProducts();
    this.getCategories();
  }

  getCategories(){
    this.productService.getCategories().subscribe((category) => {
      if(category){
        this.categories = category;
        console.log("las categorias son: ",this.categories);
      }else {
        console.log("algo salio mal, no hay datos para categorias");
      }
    });
  }

  onSelectChange(event: any) {
    const valorSeleccionado = event.target.value;
    console.log('Valor seleccionado', valorSeleccionado);
  
    // Usar Array.find para encontrar la categoría correspondiente
    const selectedCategory = this.categories.find(element => element.nombre === valorSeleccionado);
  
    if (selectedCategory) {
      this.idcategory = selectedCategory.idCategoria;
      console.log("La categoria seleccionada es: ", this.idcategory);
      this.obtenerProductos();
    } else {
      console.log("No se encontró la categoría seleccionada.");
    }
  }
  
  obtenerProductos() {
    console.log("Antes de llamar a findPerFilter. idcategory:", this.idcategory);
    this.filtrados = this.productService.findPerFilter(this.idcategory);
    console.log("Después de llamar a findPerFilter. Los productos filtrados son: ", this.filtrados);
  }
  

  }

