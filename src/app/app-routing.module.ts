import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { ResumenproductosComponent } from './components/resumenproductos/resumenproductos.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { LoginComponent } from './components/login/login.component';
import { FinalizaCompraComponent } from './components/finaliza-compra/finaliza-compra.component';
import { ReciboCompraComponent } from './components/recibo-compra/recibo-compra.component';
import { RegistroComponent } from './components/registro/registro.component';
import { loginGuard } from './guards/login.guard';
import { ConfirmarCuentaComponent } from './components/confirmar-cuenta/confirmar-cuenta.component';

const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'resumen', component: ResumenproductosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'detalles/:id', component: DetallesComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'confirmar', component: ConfirmarCuentaComponent },
  { path: 'comprar', component: FinalizaCompraComponent, canActivate: [loginGuard] },
  { path: 'acuse/:id', component: ReciboCompraComponent, canActivate: [loginGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
