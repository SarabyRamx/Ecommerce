import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/modelos/product.interface';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})

export class DetallesComponent implements OnInit {
  urlimg = "https://olympus.arvispace.com/Ecommerce/assets/Products-Images/";
  id_articulo: string = '';
  productos: Producto[] = [];

  //Manejar el estado del input
  valorInput: number = 1;
  inputDeshabilitado: boolean = false;

  constructor(private service: CartService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router) { }

  //Agregar/sumar +1 a la cantidad del input
  add1() {
    this.valorInput = +this.valorInput + 1;
    this.inputDeshabilitado = false;
  }

  //Descontar/restar -1 a la cantidad del input
  less() {
    if (this.valorInput <= 1) {
      this.inputDeshabilitado = true;
    } else {
      this.valorInput = this.valorInput - 1;
      this.inputDeshabilitado = false;
    }
  }

  //Hacer la validacion / aceptar solo numeros
  soloNumeros(event: KeyboardEvent) {
    const teclaPresionada = event.key;
    const esNumero = /^[0-9]+$/.test(teclaPresionada);
    if (!esNumero) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    //Capturar el valor que viene de la url
    const x = this.activeRoute.snapshot.paramMap.get('id');
    this.id_articulo = x!.toString();
    
    //Mandar a traer los datos del los articulos
    this.showDataURL(this.id_articulo);
  }

  //Traer los datos del articulo pasando el parametro que viene de la URL
  showDataURL(ide: string){
    let objetoJson = {
      id: ide
    };
    //Mandar a traer los datos del articulo selecionado
    this.service.getOneProduct(objetoJson).subscribe({
      next: (resultData) => {
       console.log("pero callejero de azotea.........");
       console.log(resultData);
       return this.productos = Array.isArray(resultData) ? resultData : [resultData];
      }, error: (error) => {
        console.log(error);
      }
    });
    
  }




  //Apartado productos relacionados 
  navegarPagina(url: string): void {
    //console.log("Va a navegar", url);
    this.router.navigate([ '/detalles/'+url ]);
    
    
  }

  //Detectar cuando se navega hacia atras
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    // Aquí puedes mostrar la ventana emergente con el mensaje deseado
    //if (confirm('¿Seguro que quieres volver?')) {
      //console.log('estas regresando... ando');
    //} else {
     //console.log('no estas regresando... ando');
    //}

    //Capturar el valor que viene de la url
    location.reload();
    const x = this.activeRoute.snapshot.paramMap.get('id');
    const id_actual = x!.toString();
  }

   // TIENDA ********** TIENDA *********** TIENDA ********** TIENDA *********** TIENDA ********** TIENDA
   
}
