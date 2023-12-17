import { Component, OnInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from 'src/app/modelos/product.interface';
import { ProductService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  sizeCart:number = 0;
  moneda = "MXN";
  urlImages = "https://olympus.arvispace.com/Ecommerce/assets/Products-Images/";
  myCart$ = this.ProductService.myCart$;
  constructor(private ProductService: ProductService){}

  ngOnInit(): void {
    // Suscribirse a cambios en el tamaño del carrito
    this.ProductService.sizeCart$.subscribe((size) => {
      this.sizeCart = size;
    });

    this.ProductService.getCartFromLocalStorage();
  }

  totalProduct(price: number, units: number) {
    return price * units;
  }

  deleteProduct(id:number){
    this.ProductService.deleteProduct(id);
  }

  updateUnits(operation:string, id:number){
    const product = this.ProductService.findProductById(id);
    if(product){
      if(operation == 'minus' && product.cantidad > 0){
        product.cantidad = product.cantidad - 1;
      }
      if(operation == 'add' ){
        product.cantidad = product.cantidad + 1;
      }
      if(product.cantidad === 0){
        this.deleteProduct(id);
      }
    }
  }

  totalCart(){
    const result = this.ProductService.totalCart();
    return result;
  }
}
