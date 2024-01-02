import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { CartService } from 'src/app/servicios/cart.service';
import { ProductService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-ecommerce-header',
  templateUrl: './ecommerce-header.component.html',
  styleUrls: ['./ecommerce-header.component.css']
})
export class EcommerceHeaderComponent implements OnInit, AfterViewInit {
  search = new FormControl('');
  sizeCart: number = 0;
  viewCart: boolean = false;
  @ViewChild('inputSearch')
  searchInput?: ElementRef;

  constructor(private ProductService: ProductService,
    private service: CartService, private route: ActivatedRoute,
    private router: Router) { }

  ngAfterViewInit(): void {
    fromEvent<any>(this.searchInput?.nativeElement, 'keyup')
      .pipe(
        map(keyEvent => keyEvent.target.value),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(text => this.service.emitText(text));
  }

  ngOnInit(): void {
    // Obtén la URL actual
    const currentUrl = this.router.url;
    console.log('URL actual:', currentUrl);

    // También puedes obtener información más detallada sobre la ruta activa
    this.route.url.subscribe(segments => {
      console.log('Segmentos de la URL:', segments);
    });

    // Suscribirse a cambios
    this.service.textObservable.subscribe();

    this.ProductService.sizeCart$.subscribe((size) => {
      this.sizeCart = size;
    });
  }

  onToggleCart() {
    this.viewCart = !this.viewCart;
  }
}
