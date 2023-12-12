import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  router = inject(Router);
  service = inject(CartService);

  navegarPagina(url: String): void {
    console.log("Va a navegar", url);
    this.router.navigate([ url ]);
  }

  //Cerrar sesion - eliminar token de local storage
  logout():void{
    this.service.logout();
  }

  
}
