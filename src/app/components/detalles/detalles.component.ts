import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})

export class DetallesComponent implements OnInit {
  urlimg = "https://olympus.arvispace.com/assets/img/prods-img/";
  id_articulo: string = '';
  id_prueba = '7';
  data_art: any[] = [];
  constructor(private service: CartService,
    private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    //Capturar el valor que viene de la url
     const x =  this.activeRoute.snapshot.paramMap.get('id');
     this.id_articulo = x!.toString();

     //Mandar a traer los datos del articulo selecionado
    this.service.datosArticulo(this.id_articulo).subscribe({
      next: (resultData) => {
        
        //Validar el objeto retornado es un array
        if(Array.isArray(resultData)){
          this.data_art = resultData;
          //Hacer el calculo de los articulos que tienen descuento
          this.data_art.forEach(element => {
            if(element.descuento == 1){
              element.nuevoprecio = element.price - (element.porcentaje / 100) * element.price;
            }
          });
        }

      }, error: (error) => {
        console.log(error);
      }
    });
  }

  //Agregar item al carrito
  agregarAlCarrito(qty: string){
    const x = +qty;
  }

}
