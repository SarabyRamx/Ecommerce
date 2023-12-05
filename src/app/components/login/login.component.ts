import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
//import { ConnectionService } from 'src/app/servicios/connection.service';
import { autenticación } from 'src/app/servicios/autenticacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  credentials = { data: '', password: '' };

  constructor(private autenticacion: autenticación) { }

  onSubmit(): void {
    this.autenticacion.login(this.credentials).subscribe(
      (response) => {
        // Autenticación exitosa, guardar el token
        this.autenticacion.setToken(response.token);
      },
      (error) => {
        // Manejar error de autenticación
      }
    );
  }

}
