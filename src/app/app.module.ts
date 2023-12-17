import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule} from '@angular/material/paginator';
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faPaypal,
  faTwitter,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {  faHeartBroken } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ResumenproductosComponent } from './components/resumenproductos/resumenproductos.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { LoginComponent } from './components/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { FinalizaCompraComponent } from './components/finaliza-compra/finaliza-compra.component';
import { NgxPayPalModule } from 'ngx-paypal';
import {MatDividerModule} from '@angular/material/divider';
import { ReciboCompraComponent } from './components/recibo-compra/recibo-compra.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BusquedaComponent } from './shared/busqueda/busqueda.component';
import { EcommerceHeaderComponent } from './components/ecommerce-header/ecommerce-header.component';
import { CartComponent } from './shared/cart/cart.component';
import { MainComponent } from './shared/main/main.component';
import { ProductComponent } from './shared/product/product.component';


library.add(fab);


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    HeaderComponent,
    FooterComponent,
    AdmindashboardComponent,
    CarritoComponent,
    ResumenproductosComponent,
    DetallesComponent,
    LoginComponent,
    FinalizaCompraComponent,
    ReciboCompraComponent,
    RegistroComponent,
    BusquedaComponent,
    EcommerceHeaderComponent,
    CartComponent,
    MainComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    NgxPayPalModule,
    MatDividerModule,
    MatSidenavModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faFacebook,
      faGoogle,
      faInstagram,
      faTwitter,
      faPaypal,
      faXTwitter,
      faHeartBroken
    );
  }
}
