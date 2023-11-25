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
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faPaypal,
  faTwitter,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { CarritoComponent } from './components/carrito/carrito.component';



library.add(fab);


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    HeaderComponent,
    FooterComponent,
    AdmindashboardComponent,
    CarritoComponent,
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
    MatButtonModule
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
    );
  }
}
