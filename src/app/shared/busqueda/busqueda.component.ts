import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{
  search = new FormControl('');

  constructor(private service: CartService){}
  
  ngOnInit(): void {
    this.service.textObservable.subscribe();
  }

}