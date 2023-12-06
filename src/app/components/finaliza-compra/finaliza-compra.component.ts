import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ProductService } from 'src/app/servicios/producto.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-finaliza-compra',
  templateUrl: './finaliza-compra.component.html',
  styleUrls: ['./finaliza-compra.component.css']
})
export class FinalizaCompraComponent implements OnInit {
  //Variable para menejar el pago de Paypal
  public payPalConfig?: IPayPalConfig;
  //Manejar el evento del contenedor del metodo de pago selecionado
  radioSeleccionado!: string;
  //Manejar los errores de pattern regex en cada input del formulario
  matcher = new MyErrorStateMatcher();
  //Manejar los campos del formulario
  form: FormGroup;
  //Manejar la informacion del local storage
  productos: any[] = [];
  //Manejar el valor del articulo
  subtotal: number = 0;
  //Manejar el formateo de fecha
  fecha: string = '';

  constructor(private fb: FormBuilder,
    private routes: Router,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,) {
    this.form = this.fb.group({
      tc_nom: ['', Validators.compose([Validators.required, Validators.pattern(/^[A-Za-zñÑáéíóú ]*[A-Za-z][A-Za-zñÑáéíóú ]*$/)])],
      tc_num: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      //tc_mes: ['', Validators.compose([ Validators.required])],
      //tc_ano: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      tc_fecha: ['', Validators.compose([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)])],
      tc_cvv: ['', Validators.compose([Validators.required, Validators.maxLength(3), Validators.pattern(/^(0|[1-9][0-9]*)$/)])]
    })
  }


  ngOnInit(): void {
    //Obtener los datos almacenados en localStorage
    const cartData = this.productService.getCartFromLocalStorage();
    if (cartData) {
      this.productos = cartData.productos;
      this.actualizarSubtotal();
    }
  }

  //Funcion pago con paypal *********** paypal - paypal - paypal - paypal - paypal - paypal - paypal- paypal
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'AcXxpxeoadCNQcHM-pX-lS6w1A61T5tDNTXmOtaO2b-gtIyEibZmrgqG_EBNwv03t48H1-whDLWMJoPD',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'MXN',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'items',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'MXN',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      // Metodo que retorna los datos correspondientes al pago realizado por paypal
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', JSON.stringify(data));
        //mandar datos a pantalla recibo
        //this.componentRecibo();
      },
      // Metodo que se activa cuando el usuario cierra la ventana de paypal
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      // Metodo que captura t pinta los errores
      onError: err => {
        console.log('OnError', err);
      },
      // Metodo que manda a llamar - abrir la ventana de paypal
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  //Manejar el cambio de contener - mostrar metodo de pago selecionado
  cambiarSeleccion(radio: string) {
    if (radio === 'contenedor1') {
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
    if (radio === 'contenedor3'){
      this.initConfig();
    }
    this.radioSeleccionado = radio;
  }

  //Metodo de pago con tarjeta de credito
  pagoTC() {
    console.log("algo por aca")
  }

  //Metodo de Marco para modificar el formato de fecha
  formatearFecha() {
    const ahora = new Date();
    const anioActual = ahora.getFullYear().toString().slice(2, 4); // Obtiene los últimos 2 dígitos del año actual
    const mesActual = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes actual

    if (this.fecha.length === 2 && this.fecha.indexOf('/') === -1) {
      // Agregar "/" automáticamente después de ingresar los primeros 2 dígitos para el mes
      this.fecha += '/';
    } else if (this.fecha.length === 5) {
      // Validar el formato "MM/YY"
      const partes = this.fecha.split('/');
      const mes = partes[0];
      const anio = partes[1];

      if (parseInt(anio, 10) < parseInt(anioActual, 10) || (parseInt(anio, 10) === parseInt(anioActual, 10) && parseInt(mes, 10) < parseInt(mesActual, 10))) {
        // Si el año es menor al actual o si es igual pero el mes es menor al actual, restablecer la fecha
        this.fecha = '';
      }
    } else if (this.fecha.length > 5) {
      // Si la entrada supera los 5 caracteres (formato completo "MM/YY"), truncar la entrada
      this.fecha = this.fecha.slice(0, 5);
    }
  }

  //Actualizar el valor del subtotal
  actualizarSubtotal(): void {
    this.subtotal = this.productos.reduce((total, producto) => total + (producto.cantidad * producto.price), 0);
  }
}
