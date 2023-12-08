import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as printJS from 'print-js';


@Component({
  selector: 'app-recibo-compra',
  templateUrl: './recibo-compra.component.html',
  styleUrls: ['./recibo-compra.component.css']
})
export class ReciboCompraComponent implements OnInit {
  id_compra: any;
  mostrarDiv: boolean = false;

  constructor(private activeRoute: ActivatedRoute){
    //Capturar el id de la compra para 
    this.id_compra = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  //Metodo que imprime el contenido de un elemento especifico de la pantalla html
  imprimirPantalla() {
    //this.spinner.show();
    printJS({
      //Se agrega el nombre-de-la-clase-o-id-del-elemento-a-imprimir
      printable: 'ticket_user',
      type: 'html',
      targetStyles: ['*'],
      documentTitle: 'Recibo de compra'
    });
  }
}
