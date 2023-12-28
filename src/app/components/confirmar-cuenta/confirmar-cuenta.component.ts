import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { CartService } from 'src/app/servicios/cart.service';

@Component({
  selector: 'app-confirmar-cuenta',
  templateUrl: './confirmar-cuenta.component.html',
  styleUrls: ['./confirmar-cuenta.component.css']
})
export class ConfirmarCuentaComponent implements OnInit {
  @ViewChild('inputSearch') inputSearch?: ElementRef;
  constructor(private http: HttpClient, private service: CartService){}

  ngOnInit(): void {
    if (this.inputSearch) {
    fromEvent<any>(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        map(keyEvent => keyEvent.target.value),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(text => console.log(text));
  }
  }

  
}
