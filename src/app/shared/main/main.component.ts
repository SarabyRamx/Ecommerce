import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/modelos/categoria.interface';
import { Producto } from 'src/app/modelos/product.interface';
import { producto } from 'src/app/servicios/datos';
import { ProductService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categories: Categoria[] = [];
  idcategory: number = 0;
  preciosFilter: any[] = [
    {nombre: "Ninguno", value1: 0, value2: 1000000},
    {nombre: "Hasta $350", value1: 0, value2: 350},
    {nombre: "$350 a $750", value1: 350, value2: 750 },
    {nombre: "$750 a $1500", value1: 750, value2: 1500},
    {nombre: "$1500 a $3000", value1: 1500, value2: 3000},
    {nombre: "$3000 y mas", value1: 3000, value2: 100000},

  ];
  selectedOption!: string;
  minimo: number = 0;
  maximo: number = 0;
  productosFiltrados: Producto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Llama a la función para cargar productos y establecer el paginador
    //this.loadProducts();
    this.getCategories();
    this.selectedOption = this.preciosFilter[0].nombre;
    console.log("FILTRADOS ES: ", this.productosFiltrados);
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
    this.productService.restartFilters();
    const valorSeleccionado = event.target.value;
    console.log('Valor seleccionado', valorSeleccionado);
    //this.enviarCategoria();
  
    // Usar Array.find para encontrar la categoría correspondiente
    const selectedCategory = this.categories.find(element => element.nombre === valorSeleccionado);
  
    if (selectedCategory) {
      this.idcategory = selectedCategory.idCategoria;
      console.log("La categoria seleccionada es: ", this.idcategory);
      this.productService.findPerFilterCategory(this.idcategory).subscribe((element) => {
        if(element){
          this.productosFiltrados = element;
          console.log("EL FILTRO POR CATEGORIA TRAJO ESTO: ",this.productosFiltrados);
          this.enviarFiltrados();
        }
      })
    } else {
      console.log("No se encontró la categoría seleccionada.");
    }
  }

  onOptionChange(){
    console.log('Opción seleccionada:', this.selectedOption);
    const { minimo, maximo } = this.obtenerRangoPrecio();
  
    // Aquí puedes hacer lo que necesites con los valores minimo y maximo
    console.log('Rango de precios:', minimo, maximo);
    if(this.idcategory){
      console.log("Ya hay una categoria seleccionada y es: ", this.idcategory);
      this.productService.findPerFilterPrice(minimo, maximo).subscribe((element) => {
        if(element){
          this.productosFiltrados = element;
          console.log("Los datos filtrados con categoria y precio son: ",this.productosFiltrados);
          this.enviarFiltrados();
        }
      });
    }else {
      this.productService.restartFilters();
      console.log("Aun no se selecciona una categoria pero se filtrara solo por precio, aqui esta el filtrado:");
      this.productService.findPerFilterPrice(minimo, maximo).subscribe((element) => {
        if(element){
          this.productosFiltrados = element;
          console.log(this.productosFiltrados);
          this.enviarFiltrados();
        }
      })
    }
  }

  obtenerRangoPrecio(): { minimo: number, maximo: number } {
    switch (this.selectedOption) {
      case 'Ninguno':
        //console.log("la seleccion es: ", this.selectedOption);
        return { minimo: this.preciosFilter[0].value1, maximo: this.preciosFilter[0].value2};
      case 'Hasta $350':
        //console.log("la seleccion es: ", this.selectedOption);
        return { minimo: this.preciosFilter[1].value1, maximo: this.preciosFilter[1].value2 };
      case '$350 a $750':
        //console.log("la seleccion es: ", this.selectedOption);
        return { minimo: this.preciosFilter[2].value1, maximo: this.preciosFilter[2].value2 };
      case '$750 a $1500':
        //console.log("la seleccion es: ", this.selectedOption);
        return { minimo: this.preciosFilter[3].value1, maximo: this.preciosFilter[3].value2 };
      case '$1500 a $3000':
       // console.log("la seleccion es: ", this.selectedOption);
        return { minimo: this.preciosFilter[4].value1, maximo: this.preciosFilter[4].value2 };
      case '$3000 y mas':
        //console.log("la seleccion es: ", this.selectedOption);
        return { minimo: this.preciosFilter[5].value1, maximo: this.preciosFilter[5].value2 };
      default:
        return { minimo: 0, maximo: 0}; // Valor por defecto o manejo de error
    }
  }

  enviarFiltrados(){
    this.productService.enviarFiltrados(this.productosFiltrados);
  }
  

  }

