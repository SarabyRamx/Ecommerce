import { Component, OnInit} from '@angular/core';
import { ProductService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-ecommerce-header',
  templateUrl: './ecommerce-header.component.html',
  styleUrls: ['./ecommerce-header.component.css']
})
export class EcommerceHeaderComponent implements OnInit {

  sizeCart:number = 0;
  viewCart:boolean = false;

  constructor(private ProductService: ProductService){ }

  ngOnInit(): void {
    this.ProductService.sizeCart$.subscribe((size) => {
      this.sizeCart = size;
    });
  }

  onToggleCart(){
    this.viewCart = !this.viewCart;
  }
}
